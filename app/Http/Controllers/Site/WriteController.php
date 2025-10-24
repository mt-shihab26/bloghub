<?php

namespace App\Http\Controllers\Site;

use App\Enums\PostStatus;
use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class WriteController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        Gate::allowIf(Auth::id() === $post->user_id);

        return inertia('site/write', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        Gate::allowIf(Auth::id() === $post->user_id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'excerpt' => ['required', 'string', 'max:500'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'status' => ['required', Rule::enum(PostStatus::class)],
            'published_at' => ['nullable', 'date'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['exists:tags,id'],
        ]);

        $post->update($validated);

        if (isset($validated['tags'])) {
            $post->tags()->sync($validated['tags']);
        }

        return redirect()
            ->route('site.write.edit', $post)
            ->with('success', 'Post updated successfully.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('site/write');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'excerpt' => ['required', 'string', 'max:500'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'status' => ['required', Rule::enum(PostStatus::class)],
            'published_at' => ['nullable', 'date'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['exists:tags,id'],
        ]);

        $validated['user_id'] = Auth::id();

        $post = Post::create($validated);

        if (isset($validated['tags'])) {
            $post->tags()->sync($validated['tags']);
        }

        return redirect()->route('site.write.edit', $post)
            ->with('success', 'Post created successfully.');
    }
}
