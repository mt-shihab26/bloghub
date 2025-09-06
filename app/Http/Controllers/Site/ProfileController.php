<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Redirect to profile show page.
     */
    public function me(Request $request)
    {
        return redirect()->route('site.profile.show', $request->user());
    }

    /**
     * Show the editor for writing post.
     */
    public function write(Request $request)
    {
        return inertia('site/profile/write');
    }

    /**
     * Show the settings for the user.
     */
    public function settings(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, User $user)
    {
        $posts = $user->posts()
            ->with(['image', 'tags'])
            ->withExists(['likes as liked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->withExists(['comments as commented_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->withExists(['bookmarks as bookmarked_by_user' => fn ($q) => $q->where('user_id', $request->user()?->id)])
            ->get();

        $user = [
            ...$user->toArray(),
            'image' => $user->image,
            'posts' => $posts,
            'following_count' => $user->following()->count(),
            'followers_count' => $user->followers()->count(),
            'likes_count' => $posts->sum(fn (Post $post) => $post->likes()->count()),
            'followed_by_user' => $user->followers()->where('user_id', $request->user()?->id)->exists() ?? false,
        ];

        return inertia('site/profile/show', [
            'user' => $user,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
