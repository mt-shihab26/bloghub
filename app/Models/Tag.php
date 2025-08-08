<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    /** @use HasFactory<\Database\Factories\TagFactory> */
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'slug',
    ];

    /**
     * The user who created the tag.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The posts associated with this tag.
     */
    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
}
