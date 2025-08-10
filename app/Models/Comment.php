<?php

namespace App\Models;

use App\Enums\CommentStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'post_id',
        'comment_id',
        'content',
        'status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => CommentStatus::class,
        ];
    }

    /**
     * The user who made the comment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The post this comment belongs to.
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * The parent comment (if this is a reply).
     */
    public function comment(): BelongsTo
    {
        return $this->belongsTo(Comment::class);
    }

    /**
     * Replies (child comments) to this comment.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get nested comments for this specific comment (useful for loading replies).
     */
    public function recursiveComments(): array
    {
        $allReplies = static::where('comment_id', $this->id)
            ->with('user')
            ->orderBy('created_at', 'asc')
            ->get();

        return static::buildCommentHierarchy($allReplies);
    }

    /**
     * Get nested comments for a post using efficient approach. Uses only 1 query instead of multiple nested joins.
     */
    public static function recursiveCommentsPost($postId): array
    {
        // Single query to get ALL comments for the post
        $allComments = static::where('post_id', $postId)
            ->with('user')
            ->orderBy('created_at', 'asc')
            ->get();

        // Build the nested structure in PHP
        return static::buildCommentHierarchy($allComments);
    }

    /**
     * Build hierarchical comment structure from flat collection.
     */
    private static function buildCommentHierarchy($comments): array
    {
        $commentMap = [];
        $rootComments = [];

        // First pass: Create a map of all comments
        foreach ($comments as $comment) {
            $comment->comments = [];
            $commentMap[$comment->id] = $comment;
        }

        // Second pass: Build the hierarchy
        foreach ($comments as $comment) {
            if ($comment->comment_id === null) {
                // This is a root comment
                $rootComments[] = $comment;
            } else {
                // This is a reply, add it to its parent
                if (isset($commentMap[$comment->comment_id])) {
                    $commentMap[$comment->comment_id]->comments[] = $comment;
                }
            }
        }

        return $rootComments;
    }
}
