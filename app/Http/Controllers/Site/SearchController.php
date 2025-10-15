<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Post;
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

        $postsQuery = Post::query()
            ->with(['user.image', 'image', 'category', 'tags'])
            ->withCount(['likes', 'comments'])
            ->withExists(['likes as liked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->withExists(['comments as commented_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->withExists(['bookmarks as bookmarked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
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
            })
            ->when($type === 'my-posts' && $request->user(), function ($q) use ($request) {
                $q->where('user_id', $request->user()->id);
            })
            ->when($sort === 'newest', function ($q) {
                $q->latest('published_at');
            })
            ->when($sort === 'oldest', function ($q) {
                $q->oldest('published_at');
            })
            ->when($sort === 'relevant' && $query, function ($q) use ($query) {
                // For relevant sorting, prioritize title matches over content matches
                $q->orderByRaw('
                    CASE
                        WHEN title LIKE ? THEN 1
                        WHEN excerpt LIKE ? THEN 2
                        ELSE 3
                    END
                ', ["%{$query}%", "%{$query}%"])
                    ->latest('published_at');
            })
            ->when($sort === 'relevant' && ! $query, function ($q) {
                $q->latest('published_at');
            });

        $posts = $postsQuery->paginate(10)->withQueryString();

        // Generate facets only for posts type and when there's a query
        $facets = null;
        if ($type === 'posts' && $query) {
            $facetsQuery = Post::query()
                ->when($query, function ($q) use ($query) {
                    $q->where(function ($q) use ($query) {
                        $q->where('title', 'like', "%{$query}%")
                            ->orWhere('excerpt', 'like', "%{$query}%")
                            ->orWhere('content', 'like', "%{$query}%");
                    });
                });

            $facets = [
                'authors' => (clone $facetsQuery)
                    ->join('users', 'posts.user_id', '=', 'users.id')
                    ->selectRaw('users.id, users.name, users.username, COUNT(posts.id) as count')
                    ->groupBy('users.id', 'users.name', 'users.username')
                    ->orderByDesc('count')
                    ->limit(10)
                    ->get()
                    ->toArray(),

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
        }

        return inertia('site/search', [
            'params' => [
                'query' => $query,
                'sort' => $sort,
                'type' => $type,
                'author' => $author,
                'category' => $category,
                'tag' => $tag,
            ],
            'facets' => $facets,
            'posts' => $posts,
        ]);
    }
}
