<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Post;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::query()
            ->with('user')
            ->with('image')
            ->with('category')
            ->with('tags')
            ->limit(10)
            ->get();

        return inertia('site/home/index', [
            'posts' => $posts,
        ]);
    }
}
