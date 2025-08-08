<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $extensionToMime = [
            'jpeg' => 'image/jpeg',
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
        ];

        $extension = fake()->randomElement(array_keys($extensionToMime));

        return [
            'user_id' => User::inRandomOrder()->first()?->id,
            'name' => fake()->word().'.'.$extension,
            'alt' => fake()->sentence(3),
            'memtype' => $extensionToMime[$extension],
        ];
    }
}
