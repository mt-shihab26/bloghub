<?php

namespace App\Enums;

use App\Traits\EnumBehavior;

enum CommentStatus: string
{
    use EnumBehavior;

    case APPROVED = 'approved';
    case SPAM = 'spam';
}
