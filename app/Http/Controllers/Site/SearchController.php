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

        $posts = Post::query()
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
            })
            ->paginate(10)
            ->withQueryString();

        return inertia('site/search', [
            'posts' => $posts,
            'query' => $query,
            'sort' => $sort,
            'type' => $type,
        ]);
    }
}
