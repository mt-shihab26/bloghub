<?php

namespace App\Models;

use App\Enums\PostStatus;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
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
     * Modify the collection before making it searchable.
     */
    public function makeSearchableUsing(Collection $models): Collection
    {
        return $models->load(['user.avatar', 'category', 'tags']);
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        $user = [
            'id' => $this->user->id, // @phpstan-ignore-line
            'username' => $this->user->username, // @phpstan-ignore-line
            'name' => $this->user->name, // @phpstan-ignore-line
            'image' => null,
        ];

        if ($this->user->avatar) { // @phpstan-ignore-line
            $user['image'] = [
                'id' => $this->user->avatar->id,
                'name' => $this->user->avatar->name,
            ];
        }

        $data = [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'status' => $this->status,
            'published_at' => $this->published_at?->timestamp, // @phpstan-ignore-line
            'user' => $user,
            'category' => null,
            'tags' => [],
        ];

        if ($this->category) {
            $data['category'] = [
                'id' => $this->category->id, // @phpstan-ignore-line
                'slug' => $this->category->slug, // @phpstan-ignore-line
                'name' => $this->category->name, // @phpstan-ignore-line
            ];
        }

        if ($this->tags->isNotEmpty()) {
            $data['tags'] = $this->tags
                ->map(fn ($t) => ['id' => $t->id, 'slug' => $t->slug, 'name' => $t->name]) // @phpstan-ignore-line
                ->toArray();
        }

        return $data;
    }

    /**
     * Determine if the model should be searchable.
     */
    public function shouldBeSearchable(): bool
    {
        return $this->status === PostStatus::PUBLISHED; // @phpstan-ignore-line
    }

    /**
     * Get the featured image associated with the post.
     */
    public function image(): MorphOne
    {
        return $this->morphOne(File::class, 'model')->where('memtype', 'featured');
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
