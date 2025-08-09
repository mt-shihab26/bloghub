<?php

use App\Http\Controllers\Site\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::post('/posts/{post}/like', [HomeController::class, 'toggleLike'])->middleware('auth')->name('site.authors.posts.like');

Route::get('/{user:username}', [HomeController::class, 'show'])->name('site.authors.show');
Route::get('/{user:username}/{post:slug}', [HomeController::class, 'show'])->name('site.authors.posts.show');
