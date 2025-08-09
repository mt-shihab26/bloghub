<?php

use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\TagController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::prefix('/tags')->group(function () {
    Route::get('/{tag:slug}', [TagController::class, 'show'])->name('site.tags.show');
});
Route::prefix('/posts')->group(function () {
    Route::post('/{post}/like', [PostController::class, 'toggleLike'])->middleware('auth')->name('site.posts.like');
    Route::post('/{post}/bookmark', [PostController::class, 'toggleBookmark'])->middleware('auth')->name('site.posts.bookmark');
});

Route::get('/{user:username}', [HomeController::class, 'show'])->name('site.authors.show');
Route::get('/{user:username}/{post:slug}', [HomeController::class, 'show'])->name('site.authors.posts.show');
