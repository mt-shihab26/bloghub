<?php

namespace App\Enums;

enum CommentStatus: string
{
    case APPROVED = 'approved';
    case SPAM = 'spam';
}
