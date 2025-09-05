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
            'content' => $this->generateMarkdownContent(),
            'excerpt' => fake()->paragraph(),
            'status' => fake()->randomElement(PostStatus::values()),
            'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    private function generateMarkdownContent(): string
    {
        $content = [];

        // Add heading
        $content[] = '# '.fake()->sentence();
        $content[] = '';

        // Add introduction paragraph
        $content[] = fake()->paragraph();
        $content[] = '';

        // Add subheading
        $content[] = '## '.fake()->sentence();
        $content[] = '';

        // Add paragraphs with markdown formatting
        $paragraphs = fake()->paragraphs(rand(3, 6));
        foreach ($paragraphs as $paragraph) {
            // Randomly add bold text
            if (rand(0, 2) === 0) {
                $words = explode(' ', $paragraph);
                $boldIndex = rand(0, count($words) - 3);
                $words[$boldIndex] = '**'.$words[$boldIndex];
                $words[$boldIndex + 1] = $words[$boldIndex + 1].'**';
                $paragraph = implode(' ', $words);
            }

            // Randomly add italic text
            if (rand(0, 2) === 0) {
                $words = explode(' ', $paragraph);
                $italicIndex = rand(0, count($words) - 2);
                $words[$italicIndex] = '*'.$words[$italicIndex].'*';
                $paragraph = implode(' ', $words);
            }

            $content[] = $paragraph;
            $content[] = '';
        }

        // Add code block occasionally
        if (rand(0, 2) === 0) {
            $content[] = '```javascript';
            $content[] = 'const example = "'.fake()->word().'";';
            $content[] = 'console.log(example);';
            $content[] = '```';
            $content[] = '';
        }

        // Add bullet list occasionally
        if (rand(0, 1) === 0) {
            $content[] = '### Key Points';
            $content[] = '';
            for ($i = 0; $i < rand(3, 5); $i++) {
                $content[] = '- '.fake()->sentence();
            }
            $content[] = '';
        }

        // Add blockquote occasionally
        if (rand(0, 2) === 0) {
            $content[] = '> '.fake()->sentence();
            $content[] = '';
        }

        return implode("\n", $content);
    }
}
