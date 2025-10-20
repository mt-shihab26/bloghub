<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
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
        $options = [
            'query_by' => 'title,content,excerpt,user.name,category.name,tags.name',
            'facet_by' => 'user',
        ];

        $articles = Post::search($params['query'])
            ->when($mine, fn ($builder) => $builder->where('user.id', $user->id))
            ->when($params['author'], fn ($builder) => $builder->whereIn('user.id', $params['author']))
            ->when($params['category'], fn ($builder) => $builder->whereIn('category.id', $params['category']))
            ->when($params['tag'], fn ($builder) => $builder->whereIn('tags.id', $params['tag']))
            ->when($params['sort'] === 'relevant', fn ($builder) => $builder->latest('published_at'))
            ->when($params['sort'] === 'newest', fn ($builder) => $builder->latest('published_at'))
            ->when($params['sort'] === 'oldest', fn ($builder) => $builder->oldest('published_at'))
            ->options($options)
            ->paginateRaw(perPage: 10)
            ->withQueryString();

        return [$articles, []];
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
