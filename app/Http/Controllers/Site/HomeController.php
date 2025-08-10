<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Category;
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
        $userId = $request->user()?->id;

        $posts = Post::query()
            ->with('user')
            ->with('image')
            ->with('category')
            ->with('tags')
            ->withCount('likes')
            ->withCount('comments')
            ->withExists(['likes as liked_by_user' => fn ($q) => $q->where('user_id', $userId)])
            ->withExists(['comments as commented_by_user' => fn ($q) => $q->where('user_id', $userId)])
            ->withExists(['bookmarks as bookmarked_by_user' => fn ($q) => $q->where('user_id', $userId)])
            ->limit(10)
            ->get();

        $categories = Category::query()
            ->withCount('posts')
            ->limit(10)
            ->get();

        $users = User::query()
            ->with('image')
            ->limit(10)
            ->get();

        $tags = Tag::query()
            ->limit(10)
            ->get();

        return inertia('site/home/index', [
            'posts' => $posts,
            'categories' => $categories,
            'users' => $users,
            'tags' => $tags,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, User $user, Post $post)
    {
        $userId = $request->user()?->id;

        $post
            ->load(['user.image', 'image', 'tags', 'comments'])
            ->loadCount(['likes'])
            ->loadExists(['likes as liked_by_user' => fn ($q) => $q->where('user_id', $userId)])
            ->loadExists(['likes as liked_by_user' => fn ($q) => $q->where('user_id', $userId)]);

        return inertia('site/show/index', [
            'post' => $post,
        ]);
    }
}
