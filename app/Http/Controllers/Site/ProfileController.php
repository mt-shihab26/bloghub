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

        return inertia('site/profile', [
            'user' => $user,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
