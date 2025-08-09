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

Route::prefix('/profile')->group(function () {
    Route::get('/write', [HomeController::class, 'show'])->name('site.profile.write');
    Route::get('/settings', [HomeController::class, 'show'])->name('site.profile.settings');
});

Route::get('/{user:username}', [HomeController::class, 'show'])->name('site.authors.profile');
Route::get('/{user:username}/{post:slug}', [HomeController::class, 'show'])->name('site.authors.posts.show');
