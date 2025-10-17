<?php

namespace App\Models;

use App\Enums\PostStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory, HasUuids, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'image_id',
        'category_id',
        'title',
        'slug',
        'content',
        'excerpt',
        'status',
        'published_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => PostStatus::class,
            'published_at' => 'datetime',
        ];
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        $this->loadMissing('tags');

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'image_id' => $this->image_id,
            'category_id' => $this->category_id,
            'slug' => $this->slug,
            'title' => $this->title,
            'status' => $this->status->value,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'published_at' => $this->published_at->timestamp,
            'created_at' => $this->created_at->timestamp,
            'updated_at' => $this->updated_at->timestamp,
            'tags' => $this->tags->pluck('id')->toArray(),
        ];
    }

    /**
     * Determine if the model should be searchable.
     */
    public function shouldBeSearchable(): bool
    {
        return $this->status === PostStatus::PUBLISHED;
    }

    /**
     * Get the image associated with the post.
     */
    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }

    /**
     * Get the category of the post.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the user that owns the post.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The tags associated with this post.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }

    /**
     * The users who liked this post.
     */
    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'post_user_likes')->withTimestamps();
    }

    /**
     * The users who bookmarked this post.
     */
    public function bookmarks(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'post_user_bookmarks')->withTimestamps();
    }

    /**
     * The comments for this post.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
