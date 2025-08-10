<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $firstPost = Post::first();

        // First level (top-level comments linked to the post)
        $currentLevel = Comment::factory()
            ->count(5)
            ->create([
                'comment_id' => null,
                'post_id' => $firstPost?->id,
                'user_id' => User::inRandomOrder()->first()?->id,
            ]);

        // Number of nested levels
        $depth = 5;

        for ($i = 0; $i < $depth; $i++) {
            // Create replies with no post_id
            $currentLevel = Comment::factory()
                ->count(50)
                ->make([
                    'post_id' => $firstPost?->id,
                    'user_id' => User::inRandomOrder()->first()?->id,
                ])
                ->each(function ($reply) use ($currentLevel) {
                    $reply->comment_id = $currentLevel->random()->id;
                    $reply->save();
                });
        }
    }
}
