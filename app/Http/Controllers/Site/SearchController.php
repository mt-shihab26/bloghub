<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
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

        $articles = $params['type'] === 'articles' || $params['type'] === 'my-articles'
            ? Inertia::scroll($this->searchArticles(params: $params, user: $request->user()))
            : null;

        $authors = $params['type'] === 'authors'
            ? Inertia::scroll($this->searchAuthors(params: $params))
            : null;

        $categories = $params['type'] === 'categories'
            ? Inertia::scroll($this->searchCategories(params: $params))
            : null;

        $tags = $params['type'] === 'tags'
            ? Inertia::scroll($this->searchTags(params: $params))
            : null;

        return inertia('site/search', [
            'params' => $params,
            'articles' => $articles,
            'authors' => $authors,
            'categories' => $categories,
            'tags' => $tags,
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
    private function searchArticles(array $params, ?User $user, bool $mine = false): LengthAwarePaginator
    {
        $options = [
            'query_by' => 'title,content,excerpt,user.name,category.name,tags.name',
            'facet_by' => 'user.username,category.slug,tags.slug',
        ];

        $articles = Post::search($params['query'])
            ->when($mine, fn ($builder) => $builder->where('user.id', $user->id))
            ->when($params['author'], fn ($builder) => $builder->whereIn('user.username', $params['author']))
            ->when($params['category'], fn ($builder) => $builder->whereIn('category.slug', $params['category']))
            ->when($params['tag'], fn ($builder) => $builder->whereIn('tags.slug', $params['tag']))
            ->when($params['sort'] === 'relevant', fn ($builder) => $builder->latest('published_at'))
            ->when($params['sort'] === 'newest', fn ($builder) => $builder->latest('published_at'))
            ->when($params['sort'] === 'oldest', fn ($builder) => $builder->oldest('published_at'))
            ->options($options)
            ->paginateRaw(perPage: 10)
            ->withQueryString();

        return $articles;
    }

    /**
     * Search for people/users.
     *
     * @param  array{query: string, sort: string}  $params
     */
    private function searchAuthors(array $params): LengthAwarePaginator
    {
        $options = [
            'query_by' => 'name,username,bio',
        ];

        $authors = User::search($params['query'])
            ->when($params['sort'] === 'relevant', fn ($builder) => $builder->latest('created_at'))
            ->when($params['sort'] === 'newest', fn ($builder) => $builder->latest('created_at'))
            ->when($params['sort'] === 'oldest', fn ($builder) => $builder->oldest('created_at'))
            ->options($options)
            ->paginateRaw(perPage: 10)
            ->withQueryString();

        return $authors;
    }

    /**
     * Search for categories.
     *
     * @param  array{query: string, sort: string}  $params
     */
    private function searchCategories(array $params): LengthAwarePaginator
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

        return $categories;
    }

    /**
     * Search for tags.
     *
     * @param  array{query: string, sort: string}  $params
     */
    private function searchTags(array $params): LengthAwarePaginator
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

        return $tags;
    }
}
