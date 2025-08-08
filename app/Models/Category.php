<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'slug',
        'description',
    ];

    /**
     * Get the user who owns/created this category.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the parent category.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the child categories.
     */
    public function categories()
    {
        return $this->hasMany(Category::class);
    }
}
