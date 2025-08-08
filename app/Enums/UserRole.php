<?php

namespace App\Enums;

use App\Traits\EnumBehavior;

enum UserRole: string
{
    use EnumBehavior;

    case ADMIN = 'admin';
    case AUTHOR = 'author';
    case SUBSCRIBER = 'subscriber';
}
