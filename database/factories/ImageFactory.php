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
        $seed = rand(100, 999);

        return [
            'user_id' => User::inRandomOrder()->first()?->id,
            'name' => "https://picsum.photos/1000/600?random=$seed",
            'alt' => fake()->sentence(3),
            'memtype' => 'image/jpeg',
        ];
    }
}
