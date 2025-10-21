<?php

use Illuminate\Support\Facades\DB;

if (! function_exists('logSQL')) {
    function logSQL(): void
    {
        if (app()->environment('local')) {
            DB::listen(fn ($query) => info($query->toRawSql()));
        }
    }
}
