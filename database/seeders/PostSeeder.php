<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::factory()
            ->count(1)
            ->create()
            ->each(function ($post) {
                $tags = Tag::inRandomOrder()->take(rand(1, 5))->pluck('id');
                $post->tags()->attach($tags);

                $userIds = User::inRandomOrder()->take(rand(0, 10))->pluck('id'); // 0-10 random likers
                $post->likes()->attach($userIds);
            });
    }
}
