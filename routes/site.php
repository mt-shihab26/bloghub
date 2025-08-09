<?php

use App\Http\Controllers\Site\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/{user:username}/{post:slug}', [HomeController::class, 'show'])->name('site.authors.posts.show');
