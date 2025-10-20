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
     * Modify the collection before making it searchable.
     */
    public function makeSearchableUsing(Collection $models): Collection
    {
        return $models->load(['user.image', 'category', 'tags']);
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        $data = [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'status' => $this->status,
            'published_at' => $this->published_at->timestamp,
            'user.id' => $this->user->id,
            'user.username' => $this->user->username,
            'user.name' => $this->user->name,
        ];

        if ($this->user->image) {
            $data['user.image.id'] = $this->user->image->id;
            $data['user.image.name'] = $this->user->image->name;
        }

        if ($this->category) {
            $data['category.id'] = $this->category->id;
            $data['category.slug'] = $this->category->slug;
            $data['category.name'] = $this->category->name;
        }

        if ($this->tags->isNotEmpty()) {
            $data['tags.id'] = $this->tags->pluck('id')->toArray();
            $data['tags.slug'] = $this->tags->pluck('slug')->toArray();
            $data['tags.name'] = $this->tags->pluck('name')->toArray();
        }

        return $data;
    }

    public static function toSearchableObject(array $hit): array
    {
        $document = $hit['document'] ?? [];
        $highlights = $hit['highlights'] ?? [];

        $highlightFields = [];
        foreach ($highlights as $highlight) {
            $field = $highlight['field'] ?? null;
            $snippet = $highlight['snippet'] ?? null;
            $matchedTokens = $highlight['matched_tokens'] ?? [];

            if ($field && $snippet) {
                $highlightFields[$field] = [
                    'snippet' => $snippet,
                    'matched_tokens' => $matchedTokens,
                ];

                if (isset($document[$field])) {
                    $document[$field] = $snippet;
                }
            }
        }

        return [
            'id' => $document['id'] ?? null,
            'slug' => $document['slug'] ?? null,
            'title' => $document['title'] ?? '',
            'excerpt' => $document['excerpt'] ?? '',
            'content' => $document['content'] ?? '',
            'status' => $document['status'] ?? null,
            'published_at' => $document['published_at'] ?? null,
            'user' => [
                'id' => $document['user.id'] ?? null,
                'username' => $document['user.username'] ?? null,
                'name' => $document['user.name'] ?? '',
                'image' => isset($document['user.image.id']) && isset($document['user.image.name']) ? [
                    'id' => $document['user.image.id'],
                    'name' => $document['user.image.name'],
                ] : null,
            ],
            'category' => isset($document['category.id']) && isset($document['category.slug']) && isset($document['category.name']) ? [
                'id' => $document['category.id'],
                'slug' => $document['category.slug'],
                'name' => $document['category.name'],
            ] : null,
            'tags' => isset($document['tags.id']) && is_array($document['tags.id']) ? collect($document['tags.id'])->map(function ($tagId, $index) use ($document) {
                return [
                    'id' => $tagId ?? null,
                    'slug' => $document['tags.slug'][$index] ?? null,
                    'name' => $document['tags.name'][$index] ?? null,
                ];
            })->toArray() : [],
            'highlights' => $highlightFields,
            'text_match_score' => $hit['text_match'] ?? null,
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
