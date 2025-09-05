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

        // Add main heading
        $content[] = '# '.fake()->sentence();
        $content[] = '';

        // Add comprehensive introduction (2-3 paragraphs)
        $content[] = fake()->paragraphs(rand(2, 3), true);
        $content[] = '';

        // Add multiple sections for longer content
        $numSections = rand(4, 6);
        
        for ($section = 0; $section < $numSections; $section++) {
            // Add section heading
            $content[] = '## '.fake()->sentence();
            $content[] = '';

            // Add 3-5 paragraphs per section
            $paragraphs = fake()->paragraphs(rand(3, 5));
            foreach ($paragraphs as $paragraph) {
                // Make paragraphs longer for blog-style content
                $extendedParagraph = $paragraph . ' ' . fake()->sentences(rand(2, 4), true);
                
                // Randomly add bold text
                if (rand(0, 3) === 0) {
                    $words = explode(' ', $extendedParagraph);
                    $boldIndex = rand(0, max(0, count($words) - 3));
                    if (isset($words[$boldIndex + 1])) {
                        $words[$boldIndex] = '**'.$words[$boldIndex];
                        $words[$boldIndex + 1] = $words[$boldIndex + 1].'**';
                        $extendedParagraph = implode(' ', $words);
                    }
                }

                // Randomly add italic text
                if (rand(0, 4) === 0) {
                    $words = explode(' ', $extendedParagraph);
                    $italicIndex = rand(0, max(0, count($words) - 2));
                    if (isset($words[$italicIndex])) {
                        $words[$italicIndex] = '*'.$words[$italicIndex].'*';
                        $extendedParagraph = implode(' ', $words);
                    }
                }

                $content[] = $extendedParagraph;
                $content[] = '';
            }

            // Add subsection heading occasionally
            if (rand(0, 2) === 0) {
                $content[] = '### '.fake()->sentence();
                $content[] = '';
                $content[] = fake()->paragraphs(rand(1, 2), true);
                $content[] = '';
            }

            // Add code block occasionally
            if (rand(0, 3) === 0) {
                $languages = ['javascript', 'php', 'python', 'bash', 'sql'];
                $language = $languages[array_rand($languages)];
                
                $content[] = '```'.$language;
                
                switch ($language) {
                    case 'javascript':
                        $content[] = 'const '.fake()->word().' = {';
                        $content[] = '  '.fake()->word().': "'.fake()->word().'",';
                        $content[] = '  '.fake()->word().': '.fake()->numberBetween(1, 100).',';
                        $content[] = '  '.fake()->word().': function() {';
                        $content[] = '    return "'.fake()->sentence().'";';
                        $content[] = '  }';
                        $content[] = '};';
                        break;
                    case 'php':
                        $content[] = '<?php';
                        $content[] = '';
                        $content[] = 'class '.fake()->word().'{';
                        $content[] = '    public function '.fake()->word().'(): string {';
                        $content[] = '        return "'.fake()->sentence().'";';
                        $content[] = '    }';
                        $content[] = '}';
                        break;
                    case 'python':
                        $content[] = 'def '.fake()->word().'():';
                        $content[] = '    '.fake()->word().' = "'.fake()->word().'"';
                        $content[] = '    return '.fake()->word();
                        break;
                    default:
                        $content[] = fake()->word().' = "'.fake()->sentence().'"';
                }
                
                $content[] = '```';
                $content[] = '';
            }

            // Add bullet list occasionally
            if (rand(0, 2) === 0) {
                $content[] = '### '.fake()->sentence();
                $content[] = '';
                for ($i = 0; $i < rand(4, 7); $i++) {
                    $content[] = '- **'.fake()->word().'**: '.fake()->sentence();
                }
                $content[] = '';
            }

            // Add numbered list occasionally
            if (rand(0, 3) === 0) {
                $content[] = '### Step-by-Step Guide';
                $content[] = '';
                for ($i = 1; $i <= rand(3, 6); $i++) {
                    $content[] = $i.'. '.fake()->sentence().' '.fake()->sentence();
                }
                $content[] = '';
            }

            // Add blockquote occasionally
            if (rand(0, 3) === 0) {
                $content[] = '> '.fake()->sentence().' '.fake()->sentence();
                $content[] = '> ';
                $content[] = '> *— '.fake()->name().'*';
                $content[] = '';
            }

            // Add table occasionally
            if (rand(0, 4) === 0) {
                $content[] = '| '.fake()->word().' | '.fake()->word().' | '.fake()->word().' |';
                $content[] = '|----------|----------|----------|';
                for ($i = 0; $i < rand(3, 5); $i++) {
                    $content[] = '| '.fake()->word().' | '.fake()->word().' | '.fake()->numberBetween(1, 100).' |';
                }
                $content[] = '';
            }
        }

        // Add conclusion section
        $content[] = '## Conclusion';
        $content[] = '';
        $content[] = fake()->paragraphs(rand(2, 3), true);
        $content[] = '';

        // Add call to action occasionally
        if (rand(0, 1) === 0) {
            $content[] = '---';
            $content[] = '';
            $content[] = '*What do you think about this topic? Share your thoughts in the comments below!*';
            $content[] = '';
        }

        return implode("\n", $content);
    }
}
