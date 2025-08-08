<?php

namespace Database\Factories;

use App\Enums\CommentStatus;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->id,
            'post_id' => Post::inRandomOrder()->id,
            'comment_id' => fake()->optional() && Comment::inRandomOrder()->id,
            'content' => fake()->paragraph(),
            'status' => fake()->randomElement(CommentStatus::values()),
        ];
    }
}
