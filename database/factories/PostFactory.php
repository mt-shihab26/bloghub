<?php

namespace Database\Factories;

use App\Enums\PostStatus;
use App\Models\Category;
use App\Models\Image;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id,
            'image_id' => fake()->optional() && Image::inRandomOrder()->first()?->id,
            'category_id' => fake()->optional() && Category::inRandomOrder()->first()?->id,
            'title' => fake()->unique()->sentence(),
            'slug' => fn ($post) => str()->slug($post->title),
            'content' => fake()->paragraphs(mt_rand(3, 7), true),
            'excerpt' => fake()->paragraph(),
            'status' => fake()->randomElement(PostStatus::values()),
            'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
