<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        $query = $request->input('q', '');
        $type = $request->input('type', 'articles');
        $sort = $request->input('sort', 'relevant');
        $author = $request->input('author');
        $category = $request->input('category');
        $tag = $request->input('tag');

        $params = [
            'query' => $query,
            'sort' => $sort,
            'type' => $type,
            'author' => $author,
            'category' => $category,
            'tag' => $tag,
        ];

        $facets = null;
        $articles = null;
        $authors = null;
        $categories = null;
        $tags = null;

        if ($type === 'articles') {
            $results = $this->searchArticles($request, $query, $sort, $author, $category, $tag, false);
            $articles = $results['data'] ?? null;
            $facets = $results['facets'] ?? null;
        } elseif ($type === 'my-articles' && $request->user()) {
            $results = $this->searchArticles($request, $query, $sort, $author, $category, $tag, true);
            $articles = $results['data'] ?? null;
            $facets = $results['facets'] ?? null;
        } elseif ($type === 'authors') {
            $results = $this->searchPeople($query, $sort);
            $authors = $results['data'] ?? null;
        } elseif ($type === 'categories') {
            $results = $this->searchCategories($query, $sort);
            $categories = $results['data'] ?? null;
        } elseif ($type === 'tags') {
            $results = $this->searchTags($query, $sort);
            $tags = $results['data'] ?? null;
        }

        return inertia('site/search', [
            'params' => $params,
            'facets' => $facets,
            'articles' => $articles,
            'authors' => $authors,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Search for posts with facets.
     */
    protected function searchArticles(Request $request, string $query, string $sort, ?string $author, ?string $category, ?string $tag, bool $myPostsOnly = false): array
    {
        $postsQuery = Post::query()
            ->with(['user.image', 'image', 'category', 'tags'])
            ->withCount(['likes', 'comments'])
            ->withExists(['likes as liked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->withExists(['comments as commented_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->withExists(['bookmarks as bookmarked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->when($myPostsOnly && $request->user(), function ($q) use ($request) {
                $q->where('user_id', $request->user()->id);
            })
            ->when($query, function ($q) use ($query) {
                $q->where(function ($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('excerpt', 'like', "%{$query}%")
                        ->orWhere('content', 'like', "%{$query}%");
                });
            })
            ->when($author, function ($q) use ($author) {
                $q->whereHas('user', fn ($q) => $q->where('username', $author));
            })
            ->when($category, function ($q) use ($category) {
                $q->whereHas('category', fn ($q) => $q->where('slug', $category));
            })
            ->when($tag, function ($q) use ($tag) {
                $q->whereHas('tags', fn ($q) => $q->where('slug', $tag));
            });

        $this->applySorting($postsQuery, $sort, $query);

        $posts = $postsQuery->paginate(10)->withQueryString();

        $facets = $query ? $this->generateFacetsFromPosts($postsQuery->get()) : null;

        return [
            'data' => $posts,
            'facets' => $facets,
        ];
    }

    /**
     * Search for people/users.
     */
    protected function searchPeople(string $query, string $sort): array
    {
        $usersQuery = User::query()
            ->with(['image'])
            ->withCount(['posts', 'followers'])
            ->when($query, function ($q) use ($query) {
                $q->where(function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                        ->orWhere('username', 'like', "%{$query}%")
                        ->orWhere('bio', 'like', "%{$query}%");
                });
            });

        match ($sort) {
            'newest' => $usersQuery->latest('created_at'),
            'oldest' => $usersQuery->oldest('created_at'),
            default => $usersQuery->orderByDesc('posts_count')->latest('created_at'),
        };

        return ['data' => $usersQuery->paginate(10)->withQueryString()];
    }

    /**
     * Search for tags.
     */
    protected function searchTags(string $query, string $sort): array
    {
        $tagsQuery = Tag::query()
            ->withCount(['posts'])
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            });

        match ($sort) {
            'newest' => $tagsQuery->latest('created_at'),
            'oldest' => $tagsQuery->oldest('created_at'),
            default => $tagsQuery->orderByDesc('posts_count')->latest('created_at'),
        };

        return ['data' => $tagsQuery->paginate(10)->withQueryString()];
    }

    /**
     * Search for categories.
     */
    protected function searchCategories(string $query, string $sort): array
    {
        $categoriesQuery = Category::query()
            ->withCount(['posts'])
            ->when($query, function ($q) use ($query) {
                $q->where(function ($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                        ->orWhere('description', 'like', "%{$query}%");
                });
            });

        match ($sort) {
            'newest' => $categoriesQuery->latest('created_at'),
            'oldest' => $categoriesQuery->oldest('created_at'),
            default => $categoriesQuery->orderByDesc('posts_count')->latest('created_at'),
        };

        return ['data' => $categoriesQuery->paginate(10)->withQueryString()];
    }

    /**
     * Apply sorting to a query.
     */
    protected function applySorting($query, string $sort, string $searchQuery): void
    {
        match ($sort) {
            'newest' => $query->latest('published_at'),
            'oldest' => $query->oldest('published_at'),
            'relevant' => $searchQuery
                ? $query->orderByRaw('
                    CASE
                        WHEN title LIKE ? THEN 1
                        WHEN excerpt LIKE ? THEN 2
                        ELSE 3
                    END
                ', ["%{$searchQuery}%", "%{$searchQuery}%"])->latest('published_at')
                : $query->latest('published_at'),
            default => $query->latest('published_at'),
        };
    }

    /**
     * Generate facets from the paginated posts collection.
     */
    protected function generateFacetsFromPosts($posts): array
    {
        $authors = [];
        $categories = [];
        $tags = [];

        foreach ($posts as $post) {
            // Collect authors
            if ($post->user) {
                $username = $post->user->username;
                if (! isset($authors[$username])) {
                    $authors[$username] = [
                        'id' => $post->user->id,
                        'name' => $post->user->name,
                        'username' => $post->user->username,
                        'count' => 0,
                    ];
                }
                $authors[$username]['count']++;
            }

            // Collect categories
            if ($post->category) {
                $categorySlug = $post->category->slug;
                if (! isset($categories[$categorySlug])) {
                    $categories[$categorySlug] = [
                        'id' => $post->category->id,
                        'name' => $post->category->name,
                        'slug' => $post->category->slug,
                        'count' => 0,
                    ];
                }
                $categories[$categorySlug]['count']++;
            }

            // Collect tags
            if ($post->tags) {
                foreach ($post->tags as $tag) {
                    $tagSlug = $tag->slug;
                    if (! isset($tags[$tagSlug])) {
                        $tags[$tagSlug] = [
                            'id' => $tag->id,
                            'name' => $tag->name,
                            'slug' => $tag->slug,
                            'count' => 0,
                        ];
                    }
                    $tags[$tagSlug]['count']++;
                }
            }
        }

        // Sort by count and take top 10
        $sortByCount = fn ($a, $b) => $b['count'] <=> $a['count'];

        $authors = array_values($authors);
        usort($authors, $sortByCount);
        $authors = array_slice($authors, 0, 10);

        $categories = array_values($categories);
        usort($categories, $sortByCount);
        $categories = array_slice($categories, 0, 10);

        $tags = array_values($tags);
        usort($tags, $sortByCount);
        $tags = array_slice($tags, 0, 10);

        return [
            'authors' => $authors,
            'categories' => $categories,
            'tags' => $tags,
        ];
    }
}
