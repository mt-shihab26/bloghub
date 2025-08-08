<?php

namespace App\Traits;

trait EnumBehavior
{
    /**
     * Get all values of the enum cases.
     */
    public static function values(): array
    {
        return array_map(fn ($case) => $case->value, static::cases());
    }
}
