<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::query()->where('role', 'admin')->first();

        $categories = [
            [
                'name' => 'Web Development',
                'slug' => 'web-development',
                'description' => 'Articles about modern web development, frameworks, and best practices for building robust web applications.',
                'user_id' => $admin->id,
            ],
            [
                'name' => 'Backend Engineering',
                'slug' => 'backend-engineering',
                'description' => 'Deep dives into server-side programming, API design, database management, and backend architecture.',
                'user_id' => $admin->id,
            ],
            [
                'name' => 'Frontend Development',
                'slug' => 'frontend-development',
                'description' => 'Everything about creating beautiful, interactive user interfaces with modern JavaScript frameworks and CSS.',
                'user_id' => $admin->id,
            ],
            [
                'name' => 'DevOps & Infrastructure',
                'slug' => 'devops-infrastructure',
                'description' => 'Guides on CI/CD pipelines, containerization, cloud platforms, and infrastructure automation.',
                'user_id' => $admin->id,
            ],
            [
                'name' => 'Mobile Development',
                'slug' => 'mobile-development',
                'description' => 'Building native and cross-platform mobile applications for iOS and Android.',
                'user_id' => $admin->id,
            ],
            [
                'name' => 'Security & Privacy',
                'slug' => 'security-privacy',
                'description' => 'Best practices for secure coding, vulnerability prevention, and protecting user data.',
                'user_id' => $admin->id,
            ],
            [
                'name' => 'Database & Data',
                'slug' => 'database-data',
                'description' => 'Working with SQL and NoSQL databases, data modeling, optimization, and big data technologies.',
                'user_id' => $admin->id,
            ],
            [
                'name' => 'Tutorials',
                'slug' => 'tutorials',
                'description' => 'Step-by-step guides and tutorials for learning new technologies and building projects.',
                'user_id' => $admin->id,
            ],
            [
                'name' => 'Career & Growth',
                'slug' => 'career-growth',
                'description' => 'Career advice, professional development, and tips for growing as a software developer.',
                'user_id' => $admin->id,
            ],
            [
                'name' => 'Open Source',
                'slug' => 'open-source',
                'description' => 'Contributing to open source projects, building communities, and sharing knowledge.',
                'user_id' => $admin->id,
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::query()->create($categoryData);
        }
    }
}
