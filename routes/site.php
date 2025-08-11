<?php

use App\Http\Controllers\Site\CategoryController;
use App\Http\Controllers\Site\CommentController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\NewsletterController;
use App\Http\Controllers\Site\PostController;
use App\Http\Controllers\Site\ProfileController;
use App\Http\Controllers\Site\TagController;
use App\Http\Controllers\Site\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::prefix('/users')->group(function () {
    Route::patch('/{user}/follow', [UserController::class, 'toggleFollow'])->middleware(['auth'])->name('site.users.follow');
});

Route::prefix('/categories')->group(function () {
    Route::get('/{category:slug}', [CategoryController::class, 'show'])->name('site.categories.show');
});

Route::prefix('/tags')->group(function () {
    Route::get('/{tag:slug}', [TagController::class, 'show'])->name('site.tags.show');
});

Route::prefix('/posts')->group(function () {
    Route::patch('/{post}/like', [PostController::class, 'toggleLike'])->middleware('auth')->name('site.posts.like');
    Route::patch('/{post}/bookmark', [PostController::class, 'toggleBookmark'])->middleware('auth')->name('site.posts.bookmark');
});

Route::prefix('/comments')->group(function () {
    Route::post('/', [CommentController::class, 'store'])->middleware(['auth'])->name('site.comments.store');
    Route::patch('/{comment}', [CommentController::class, 'update'])->middleware(['auth'])->name('site.comments.update');
    Route::delete('/{comment}', [CommentController::class, 'destroy'])->middleware(['auth'])->name('site.comments.destroy');
});

Route::prefix('/profile')->group(function () {
    Route::get('/me', fn () => redirect()->route('site.authors.profile', request()->user()))->name('site.profile.me');

    Route::get('/write', [ProfileController::class, 'write'])->name('site.profile.write');
    Route::get('/settings', [ProfileController::class, 'settings'])->name('site.profile.settings');
});

Route::prefix('/newsletter')->group(function () {
    Route::post('/subscribe', [NewsletterController::class, 'store'])->name('site.newsletter.subscribe');
});

Route::get('/{user:username}', [ProfileController::class, 'index'])->name('site.authors.profile');
Route::get('/{user:username}/{post:slug}', [HomeController::class, 'show'])->name('site.authors.posts.show');
