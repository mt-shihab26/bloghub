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
        $title = fake()->unique()->sentence();

        return [
            'user_id' => User::inRandomOrder()->first()?->id,
            'image_id' => Image::factory(),
            'category_id' => fake()->optional() ? Category::inRandomOrder()->first()?->id : null,
            'title' => $title,
            'slug' => str()->slug($title),
            'content' => implode("\n\n", fake()->paragraphs()),
            'excerpt' => fake()->paragraph(),
            'status' => fake()->randomElement(PostStatus::values()),
            'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
