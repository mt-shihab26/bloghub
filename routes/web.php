<?php

use App\Http\Controllers\Admin\PasswordController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Site\CategoryController;
use App\Http\Controllers\Site\CommentController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\NewsletterController;
use App\Http\Controllers\Site\PostController;
use App\Http\Controllers\Site\ProfileController;
use App\Http\Controllers\Site\SearchController;
use App\Http\Controllers\Site\TagController;
use App\Http\Controllers\Site\UserController;
use App\Http\Controllers\Site\WriteController;
use Illuminate\Support\Facades\Route;

// authentication routes
Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store'])
        ->middleware('throttle:6,1');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

// admin routes
Route::prefix('/admin')->middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/', '/admin/dashboard')->name('admin');

    Route::prefix('/dashboard')->group(function () {
        Route::get('/', fn () => inertia('admin/dashboard'))->name('admin.dashboard');
    });

    Route::prefix('/settings')->group(function () {
        Route::redirect('/', '/admin/settings/profile')->name('admin.settings');
        Route::get('/profile', [AdminProfileController::class, 'edit'])->name('admin.settings.profile.edit');
        Route::patch('/profile', [AdminProfileController::class, 'update'])->name('admin.settings.profile.update');
        Route::delete('/profile', [AdminProfileController::class, 'destroy'])->name('admin.settings.profile.destroy');
        Route::get('/password', [PasswordController::class, 'edit'])->name('admin.settings.password.edit');
        Route::put('/password', [PasswordController::class, 'update'])->middleware('throttle:6,1')->name('admin.settings.password.update');
        Route::get('/appearance', fn () => inertia('admin/settings/appearance'))->name('admin.settings.appearance');
    });
});

// site routes

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
    Route::patch('/{comment}/like', [CommentController::class, 'toggleLike'])->middleware(['auth'])->name('site.comments.like');
});

Route::prefix('/newsletter')->group(function () {
    Route::post('/subscribe', [NewsletterController::class, 'store'])->name('site.newsletter.subscribe');
});

Route::prefix('/settings')->group(function () {
    Route::get('/', [ProfileController::class, 'settings'])->middleware('auth')->name('site.settings.index');
});

Route::prefix('/reading-list')->middleware('auth')->group(function () {
    Route::get('/', [WriteController::class, 'create'])->name('site.reading-list.index');
});

Route::prefix('/write')->middleware('auth')->group(function () {
    Route::get('/{post}', [WriteController::class, 'edit'])->name('site.write.edit');
    Route::patch('/{post}', [WriteController::class, 'update'])->name('site.write.update');
    Route::get('/', [WriteController::class, 'create'])->name('site.write.create');
    Route::post('/', [WriteController::class, 'store'])->name('site.write.store');
});

Route::prefix('/dashboard')->middleware('auth')->group(function () {
    Route::get('/', [WriteController::class, 'create'])->name('site.dashboard.index');
});

Route::prefix('/search')->group(function () {
    Route::get('/', [SearchController::class, 'index'])->name('site.search.index');
});

Route::prefix('/')->group(function () {
    Route::get('/profile/me', [ProfileController::class, 'me'])->middleware('auth')->name('site.profile.me');
    Route::get('/{user:username}', [ProfileController::class, 'show'])->name('site.profile.show');
});

Route::prefix('/')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/{user:username}/{post:slug}', [HomeController::class, 'show'])->name('site.post');
});
