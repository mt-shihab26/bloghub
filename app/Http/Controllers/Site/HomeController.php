<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $posts = Post::query()
            ->with(['user', 'image', 'category', 'tags'])
            ->withCount(['likes', 'comments'])
            ->withExists(['likes as liked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->withExists(['comments as commented_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->withExists(['bookmarks as bookmarked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->limit(10)
            ->get();

        $categories = Category::query()
            ->withCount('posts')
            ->limit(10)
            ->get();

        $tags = Tag::query()
            ->limit(10)
            ->get();

        $discussions = Post::query()
            ->select(['id', 'user_id', 'title', 'slug'])
            ->with('user:id,username')
            ->withCount('comments')
            ->orderByDesc('comments_count')
            ->limit(5)
            ->get();

        return inertia('site/home', [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
            'discussions' => $discussions,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, User $user, Post $post)
    {
        $post->load(['image', 'category', 'tags'])
            ->loadCount(['likes', 'comments'])
            ->loadExists(['likes as liked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->loadExists(['bookmarks as bookmarked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)]);

        $comments = Comment::query()
            ->where('post_id', $post->id)
            ->with(['user.image'])
            ->withCount(['likes'])
            ->withExists(['likes as liked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->orderBy('created_at', 'desc')
            ->get();

        $followedByUser = $user->followers()
            ->where('user_id', $request->user()?->id)
            ->exists();

        $comments = Comment::tree($comments);

        return inertia('site/post', [
            'post' => [
                ...$post->toArray(),
                'user' => $user->load('image'),
                'comments' => $comments,
                'followed_by_user' => $followedByUser,
            ],
        ]);
    }
}
