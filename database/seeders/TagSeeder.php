<?php

namespace Database\Seeders;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::query()->where('role', 'admin')->first();

        $tags = [
            'laravel', 'php', 'javascript', 'react', 'vue', 'tailwindcss',
            'mysql', 'postgresql', 'mongodb', 'redis',
            'docker', 'kubernetes', 'aws', 'azure', 'gcp',
            'api', 'rest', 'graphql', 'microservices',
            'testing', 'tdd', 'ci-cd', 'git',
            'typescript', 'node', 'express', 'nextjs',
            'flutter', 'react-native', 'ios', 'android',
            'security', 'authentication', 'authorization', 'encryption',
            'performance', 'optimization', 'caching',
            'design-patterns', 'clean-code', 'solid',
            'agile', 'scrum', 'devops',
            'vscode', 'debugging', 'refactoring',
            'career', 'interview', 'remote-work',
            'open-source', 'github', 'contributing',
        ];

        foreach ($tags as $tag) {
            Tag::query()->create([
                'name' => $tag,
                'slug' => Str::slug($tag),
                'user_id' => $admin->id,
            ]);
        }
    }
}
