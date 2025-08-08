<?php

use App\Http\Controllers\Admin\PasswordController;
use App\Http\Controllers\Admin\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/', '/admin/dashboard')->name('admin');

    Route::prefix('/dashboard')->group(function () {
        Route::get('/', fn () => inertia('admin/dashboard'))->name('admin.dashboard');
    });

    Route::prefix('/settings')->group(function () {
        Route::redirect('/', '/admin/settings/profile')->name('admin.settings');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('admin.settings.profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('admin.settings.profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('admin.settings.profile.destroy');
        Route::get('/password', [PasswordController::class, 'edit'])->name('admin.settings.password.edit');
        Route::put('/password', [PasswordController::class, 'update'])->middleware('throttle:6,1')->name('admin.settings.password.update');
        Route::get('/appearance', fn () => inertia('admin/settings/appearance'))->name('admin.settings.appearance');
    });
});
