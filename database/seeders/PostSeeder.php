<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::factory()
            ->count(20)
            ->create()
            ->each(function ($post) {
                $tags = Tag::inRandomOrder()->take(rand(1, 5))->pluck('id');
                $post->tags()->attach($tags);
            });
    }
}
