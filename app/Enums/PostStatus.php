<?php

namespace App\Enums;

use App\Traits\EnumBehavior;

enum PostStatus: string
{
    use EnumBehavior;

    case DRAFT = 'draft';
    case PUBLISHED = 'published';
    case ARCHIVED = 'archived';
}
