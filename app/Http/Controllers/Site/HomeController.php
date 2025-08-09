<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Post;
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
            ->withCount('likes', 'likes')
            ->withExists(['likes as likes_by_user' => fn ($q) => $q->where('user_id', $userId)])
            ->limit(10)
            ->get();

        return inertia('site/home/index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user, Post $post)
    {
        return inertia('site/home/show');
    }

    /**
     * Toggle like on a post by the authenticated user.
     */
    public function toggleLike(Request $request, Post $post)
    {
        $user = $request->user();

        if ($post->likes()->where('user_id', $user->id)->exists()) {
            $post->likes()->detach($user->id);
        } else {
            $post->likes()->attach($user->id);
        }

        return redirect()->route('home');
    }
}
