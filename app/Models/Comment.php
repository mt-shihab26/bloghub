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
     * Get nested comments for this specific comment
     *
     * @return Comment[]
     */
    public function replies(): array
    {
        $comments = self::where('comment_id', $this->id)
            ->with('user')
            ->orderBy('created_at', 'asc')
            ->get();

        return self::buildCommentHierarchy($comments);
    }

    /**
     * Get nested comments for a post using efficient approach. Uses only 1 query instead of multiple nested joins.
     *
     * @return Comment[]
     */
    public static function recursive($postId): array
    {
        $comments = self::where('post_id', $postId)
            ->with('user')
            ->orderBy('created_at', 'asc')
            ->get();

        return self::buildCommentHierarchy($comments);
    }

    /**
     * Build hierarchical comment structure from flat collection.
     *
     * @param  Comment[]  $comments
     * @return Comment[]
     */
    private static function buildCommentHierarchy(array $comments): array
    {
        $hierarchy = [];
        $lookup = [];

        foreach ($comments as $comment) {
            $lookup[$comment->id] = $comment;
            $comment->replies = [];
        }

        foreach ($comments as $comment) {
            if ($comment->comment_id && isset($lookup[$comment->comment_id])) {
                $lookup[$comment->comment_id]->replies[] = $comment;
            } else {
                $hierarchy[] = $comment;
            }
        }

        return $hierarchy;
    }
}
