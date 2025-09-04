<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->disableLazyLoading();
    }

    /**
     * Disable lazy loading in development to catch N+1 issues
     */
    private function disableLazyLoading(): void
    {
        if (! app()->environment('production')) {
            Model::preventLazyLoading();
        }
    }
}
