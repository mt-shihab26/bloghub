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
        $sort = $request->input('sort', 'relevant');
        $type = $request->input('type', 'posts');
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
        $posts = null;
        $people = null;
        $categories = null;
        $tags = null;

        if ($type === 'posts') {
            $results = $this->searchPosts($request, $query, $sort, $author, $category, $tag, false);
            $posts = $results['data'] ?? null;
            $facets = $results['facets'] ?? null;
        } elseif ($type === 'my-posts' && ! $request->user()) {
            $results = $this->searchPosts($request, $query, $sort, $author, $category, $tag, true);
            $posts = $results['data'] ?? null;
            $facets = $results['facets'] ?? null;
        } elseif ($type === 'people') {
            $results = $this->searchPeople($query, $sort);
            $people = $results['data'] ?? null;
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
            'posts' => $posts,
            'people' => $people,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Search for posts with facets.
     */
    protected function searchPosts(Request $request, string $query, string $sort, ?string $author, ?string $category, ?string $tag, bool $myPostsOnly = false): array
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
        $facets = $query ? $this->generateFacets($query, $myPostsOnly ? $request->user()?->id : null) : null;

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
     * Generate facets for post search results.
     */
    protected function generateFacets(string $query, ?string $userId = null): array
    {
        $facetsQuery = Post::query()
            ->when($userId, function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->when($query, function ($q) use ($query) {
                $q->where(function ($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('excerpt', 'like', "%{$query}%")
                        ->orWhere('content', 'like', "%{$query}%");
                });
            });

        $facets = [
            'categories' => (clone $facetsQuery)
                ->join('categories', 'posts.category_id', '=', 'categories.id')
                ->selectRaw('categories.id, categories.name, categories.slug, COUNT(posts.id) as count')
                ->groupBy('categories.id', 'categories.name', 'categories.slug')
                ->orderByDesc('count')
                ->limit(10)
                ->get()
                ->toArray(),

            'tags' => (clone $facetsQuery)
                ->join('post_tag', 'posts.id', '=', 'post_tag.post_id')
                ->join('tags', 'post_tag.tag_id', '=', 'tags.id')
                ->selectRaw('tags.id, tags.name, tags.slug, COUNT(DISTINCT posts.id) as count')
                ->groupBy('tags.id', 'tags.name', 'tags.slug')
                ->orderByDesc('count')
                ->limit(10)
                ->get()
                ->toArray(),
        ];

        // Only include authors facet if not filtering by user
        if (! $userId) {
            $facets['authors'] = (clone $facetsQuery)
                ->join('users', 'posts.user_id', '=', 'users.id')
                ->selectRaw('users.id, users.name, users.username, COUNT(posts.id) as count')
                ->groupBy('users.id', 'users.name', 'users.username')
                ->orderByDesc('count')
                ->limit(10)
                ->get()
                ->toArray();
        }

        return $facets;
    }
}
