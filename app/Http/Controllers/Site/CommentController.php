<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
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
        $validated = $request->validate([
            'content' => ['required', 'string', 'min:3', 'max:1000'],
            'post_id' => ['required', 'exists:posts,id'],
            'comment_id' => ['nullable', 'exists:comments,id'],
        ]);

        $request->user()->comments()->create($validated);

        return redirect()->back()->with('success', 'Comment posted successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        Gate::allowIf(fn ($user) => $user->id === $comment->user_id);

        $validated = $request->validate([
            'content' => ['required', 'string', 'min:3', 'max:1000'],
        ]);

        $comment->update($validated);

        return redirect()->back()->with('success', 'Comment updated successfully!');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        Gate::allowIf(fn ($user) => $user->id === $comment->user_id);

        $comment->delete();

        return redirect()->back()->with('success', 'Comment deleted successfully!');
    }

    /**
     * Toggle like on a comment by the authenticated user.
     */
    public function toggleLike(Request $request, Comment $comment)
    {
        $user = $request->user();

        if ($comment->likes()->where('user_id', $user->id)->exists()) {
            $comment->likes()->detach($user->id);
        } else {
            $comment->likes()->attach($user->id);
        }

        return redirect()->back();
    }
}
