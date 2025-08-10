<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $firstPost = Post::first();

        $parents = Comment::factory()
            ->count(5)
            ->create([
                'comment_id' => null,
                'post_id' => $firstPost?->id,
                'user_id' => User::inRandomOrder()->first()?->id,
            ]);
    }
}
