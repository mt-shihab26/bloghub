<?php

namespace App\Models;

use App\Enums\CommentStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
     * Users who liked this comment
     */
    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'comment_user_likes')->withTimestamps();
    }

    /**
     * Get nested comments for this specific comment
     */
    public function replies(array $with = []): mixed
    {
        $comments = self::where('comment_id', $this->id)
            ->with($with)
            ->orderBy('created_at', 'asc')
            ->get();

        return self::buildCommentHierarchy($comments);
    }

    /**
     * Get nested comments for a post using efficient approach. Uses only 1 query instead of multiple nested joins.
     */
    public static function recursive($postId, array $with = []): mixed
    {
        $comments = self::where('post_id', $postId)
            ->with($with)
            ->orderBy('created_at', 'desc')
            ->get();

        return self::buildCommentHierarchy($comments);
    }

    /**
     * Build hierarchical comment structure from flat collection.
     */
    private static function buildCommentHierarchy(mixed $comments): mixed
    {
        $grouped = $comments->groupBy('comment_id');
        $tree = $grouped->get(null, collect()); // Top-level comments (comment_id is null)

        // Recursively build the tree
        $buildTree = function ($parentComments) use ($grouped, &$buildTree) {
            return $parentComments->map(function ($comment) use ($grouped, $buildTree) {
                $childrenComments = $grouped->get($comment->id, collect());
                $comment->comments = $buildTree($childrenComments);

                return $comment;
            });
        };

        return $buildTree($tree);
    }
}
