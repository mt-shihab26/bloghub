<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        logSQL();

        $query = $request->input('query', '');

        if (! $query) {
            return redirect()->route('home')->with('error', 'Please enter a search query.');
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
                    ['articles' => Inertia::scroll($articles)],
                    ['articles' => $facets ?? null],
                ];
            })(),
            'my-articles' => (function () use ($params, $request) {
                [$articles, $facets] = $this->searchArticles(params: $params, user: $request->user(), mine: true);

                return [
                    ['articles' => Inertia::scroll($articles)],
                    ['articles' => $facets ?? null],
                ];
            })(),
            'authors' => (function () use ($params) {
                [$authors, $facets] = $this->searchAuthors(params: $params);

                return [
                    ['authors' => Inertia::scroll($authors)],
                    ['authors' => $facets ?? null],
                ];
            })(),
            'categories' => (function () use ($params) {
                [$categories, $facets] = $this->searchCategories(params: $params);

                return [
                    ['categories' => Inertia::scroll($categories)],
                    ['categories' => $facets ?? null],
                ];
            })(),
            'tags' => (function () use ($params) {
                [$tags, $facets] = $this->searchTags(params: $params);

                return [
                    ['tags' => Inertia::scroll($tags)],
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
            'articles' => $lists['articles'] ?? null,
            'authors' => $lists['authors'] ?? null,
            'categories' => $lists['categories'] ?? null,
            'tags' => $lists['tags'] ?? null,
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
        $load = fn (Builder $query) => $query->with(['user.image', 'image', 'category', 'tags']);

        $articles = Post::search($params['query'])
            ->when($mine, fn ($builder) => $builder->where('user.id', $user->id))
            ->when($params['author'], fn ($builder) => $builder->whereIn('user.id', $params['author']))
            ->when($params['category'], fn ($builder) => $builder->whereIn('category.id', $params['category']))
            ->when($params['tag'], fn ($builder) => $builder->whereIn('tags.id', $params['tag']))
            ->when($params['sort'] === 'relevant', fn ($builder) => $builder->latest('published_at'))
            ->when($params['sort'] === 'newest', fn ($builder) => $builder->latest('published_at'))
            ->when($params['sort'] === 'oldest', fn ($builder) => $builder->oldest('published_at'))
            ->query($load)
            ->paginate(10)
            ->withQueryString();

        $facets = $this->generateFacetsFromArticles($articles);

        return [$articles, $facets];
    }

    /**
     * Generate facets from the paginated posts collection.
     *
     * @param  LengthAwarePaginator<int, Post>  $posts
     */
    private function generateFacetsFromArticles($posts): array
    {
        $authors = [];
        $categories = [];
        $tags = [];

        foreach ($posts as $post) {
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

    /**
     * Search for people/users.
     *
     * @param  array{query: string, sort: string}  $params
     */
    private function searchAuthors(array $params): array
    {
        $usersQuery = User::query()
            ->with(['image'])
            ->withCount(['posts', 'followers'])
            ->when($params['query'], function ($q) use ($params) {
                $q->where(function ($q) use ($params) {
                    $q->where('name', 'like', "%{$params['query']}%")
                        ->orWhere('username', 'like', "%{$params['query']}%")
                        ->orWhere('bio', 'like', "%{$params['query']}%");
                });
            });

        match ($params['sort']) {
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
}
