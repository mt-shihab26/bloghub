<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        $query = $request->input('q', '');

        if (! $query) {
            return redirect()
                ->route('home')
                ->with('error', 'Please enter a search query.');
        }

        $params = [
            'query' => $query,
            'type' => $request->input('type', 'articles'),
            'sort' => $request->input('sort', 'relevant'),
            'author' => $this->parseFilterArray($request->input('author')) ?: null,
            'category' => $this->parseFilterArray($request->input('category')) ?: null,
            'tag' => $this->parseFilterArray($request->input('tag')) ?: null,
        ];

        [$lists, $facets] = match ($params['type']) {
            'articles' => (function () use ($params, $request) {
                [$articles, $facets] = $this->searchArticles(params: $params, user: $request->user());

                return [
                    ['articles' => $articles ?? null],
                    ['articles' => $facets ?? null],
                ];
            })(),
            'my-articles' => (function () use ($params, $request) {
                [$articles, $facets] = $this->searchArticles(params: $params, user: $request->user(), mine: true);

                return [
                    ['articles' => $articles ?? null],
                    ['articles' => $facets ?? null],
                ];
            })(),
            'authors' => (function () use ($params) {
                [$authors, $facets] = $this->searchAuthors(params: $params);

                return [
                    ['authors' => $authors ?? null],
                    ['authors' => $facets ?? null],
                ];
            })(),
            'categories' => (function () use ($params) {
                [$categories, $facets] = $this->searchCategories(params: $params);

                return [
                    ['categories' => $categories ?? null],
                    ['categories' => $facets ?? null],
                ];
            })(),
            'tags' => (function () use ($params) {
                [$tags, $facets] = $this->searchTags(params: $params);

                return [
                    ['tags' => $tags ?? null],
                    ['tags' => $facets ?? null],
                ];
            })(),
            default => [
                [],
                [],
            ],
        };

        return inertia('site/search', [
            'params' => $params,
            'facets' => $facets,
            'lists' => $lists,
        ]);
    }

    /**
     * Parse filter input into an array.
     *
     * @param  string|string[]|null  $input
     * @return string[]
     */
    public function parseFilterArray($input)
    {
        return is_array($input)
            ? array_values(array_filter($input))
            : array_values(array_filter(explode(',', $input ?? '')));
    }

    /**
     * Search for posts with facets.
     *
     * @param  array{query: string, sort: string, author: string[]|null, category: string[]|null, tag: string[]|null}  $params
     */
    private function searchArticles(array $params, ?User $user, bool $mine = false): array
    {
        $userId = $user?->id;

        $queryBuilder = fn (Builder $query) => $query
            ->with(['user.image', 'image', 'category', 'tags'])
            ->withCount(['likes', 'comments'])
            ->withExists(['likes as liked_by_user' => fn ($q) => $q->where('user_id', $userId)])
            ->withExists(['comments as commented_by_user' => fn ($q) => $q->where('user_id', $userId)])
            ->withExists(['bookmarks as bookmarked_by_user' => fn ($q) => $q->where('user_id', $userId)]);

        $searchBuilder = Post::search($params['query'])
            ->query($queryBuilder);

        if ($mine) {
            $searchBuilder->where('user_id', $user->id);
        }

        $articles = $searchBuilder
            ->paginate(10)
            ->withQueryString();

        $facets = null;

        return [
            $articles,
            $facets,
        ];
    }

    /**
     * Search for people/users.
     *
     * @param  array{query: string, sort: string}  $params
     */
    private function searchAuthors(array $params): array
    {
        $query = $params['query'];
        $sort = $params['sort'];

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

        $authors = $usersQuery->paginate(10)->withQueryString();
        $facets = null;

        return [
            $authors,
            $facets,
        ];
    }

    /**
     * Search for categories.
     *
     * @param  array{query: string, sort: string}  $params
     */
    private function searchCategories(array $params): array
    {
        $query = $params['query'];
        $sort = $params['sort'];

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

        $categories = $categoriesQuery->paginate(10)->withQueryString();
        $facets = null;

        return [
            $categories,
            $facets,
        ];
    }

    /**
     * Search for tags.
     *
     * @param  array{query: string, sort: string}  $params
     */
    private function searchTags(array $params): array
    {
        $query = $params['query'];
        $sort = $params['sort'];

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

        $tags = $tagsQuery->paginate(10)->withQueryString();
        $facets = null;

        return [
            $tags,
            $facets,
        ];
    }

    /**
     * Apply sorting to a query.
     */
    private function applySorting($query, string $sort, string $searchQuery): void
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
    private function generateFacetsFromPosts($posts): array
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
