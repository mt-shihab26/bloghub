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
            ->count(20)
            ->create([
                'comment_id' => null,
                'post_id' => $firstPost?->id,
                'user_id' => User::inRandomOrder()->first()?->id,
            ]);

        Comment::factory()
            ->count(30)
            ->make()
            ->each(function ($reply) use ($parents, $firstPost) {
                $reply->user_id = User::inRandomOrder()->first()?->id;
                $reply->comment_id = $parents->random()->id;
                $reply->post_id = $firstPost?->id;
                $reply->save();
            });
    }
}
