<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\UploadedFile;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Searchable;

/**
 * @property-read File|null $avatar
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasUuids, Notifiable, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'role',
        'name',
        'bio',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'role' => UserRole::class,
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Modify the collection before making it searchable.
     */
    public function makeSearchableUsing(Collection $models): Collection
    {
        return $models->load('avatar');
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
            'name' => $this->name,
            'username' => $this->username,
            'bio' => $this->bio,
            'created_at' => $this->created_at?->timestamp,
            'image' => null,
        ];

        if ($this->avatar) {
            $data['image'] = [
                'id' => $this->avatar?->id, // @phpstan-ignore-line
                'name' => $this->avatar?->name, // @phpstan-ignore-line
            ];
        }

        return $data;
    }

    /**
     * Get the user's avatar file.
     */
    public function avatar(): MorphOne
    {
        return $this->morphOne(File::class, 'model')->where('memtype', 'avatar');
    }

    /**
     * Get the categories created by the user.
     */
    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    /**
     * Get the tags created by the user.
     */
    public function tags(): HasMany
    {
        return $this->hasMany(Tag::class);
    }

    /**
     * Get the posts created by the user.
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    /**
     * The posts liked by the user.
     */
    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_user_likes')->withTimestamps();
    }

    /**
     * Comments that this user has liked
     */
    public function likedComments(): BelongsToMany
    {
        return $this->belongsToMany(Comment::class, 'comment_user_likes')->withTimestamps();
    }

    /**
     * The posts bookmarked by the user.
     */
    public function bookmarks(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, 'post_user_bookmarks')->withTimestamps();
    }

    /**
     * The comments made by the user.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Users that this user is following
     */
    public function following(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'following_id')->withTimestamps();
    }

    /**
     * Users that are following this user (followers)
     */
    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'followers', 'following_id', 'user_id')->withTimestamps();
    }

    /**
     * Upload avatar for the user.
     */
    public function uploadAvatar(UploadedFile $file): void
    {
        $filename = str($this->username)
            ->append('.')
            ->append($file->getClientOriginalExtension())
            ->toString();

        $path = $file->storeAs('avatars', $filename, ['disk' => 'public']);

        // Delete old avatar if exists
        if ($this->avatar) {
            Storage::disk('public')->delete($this->avatar->name);
            $this->avatar->delete();
        }

        // Create or update file record
        File::updateOrCreate(
            [
                'model_type' => self::class,
                'model_id' => $this->id,
                'memtype' => 'avatar',
            ],
            [
                'name' => $path,
                'user_id' => $this->id,
            ]
        );
    }
}
