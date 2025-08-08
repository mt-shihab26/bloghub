<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
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
            'category_id' => fake()->optional() && Category::inRandomOrder()->first()?->id,
            'name' => fake()->unique()->words(mt_rand(1, 3), true),
            'slug' => fn ($category) => str()->slug($category->name),
            'description' => fake()->optional()->sentence(),
        ];
    }
}
