<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'username' => 'sarah_dev',
                'name' => 'Sarah Johnson',
                'email' => 'sarah@example.com',
                'password' => 'password',
                'role' => UserRole::ADMIN,
                'bio' => 'Full-stack developer with 10+ years of experience. Passionate about clean code, Laravel, and building scalable web applications.',
            ],
            [
                'username' => 'mike_tech',
                'name' => 'Mike Chen',
                'email' => 'mike@example.com',
                'password' => 'password',
                'role' => UserRole::AUTHOR,
                'bio' => 'Frontend specialist who loves React and modern JavaScript. Always exploring new web technologies and design patterns.',
            ],
            [
                'username' => 'emily_writes',
                'name' => 'Emily Rodriguez',
                'email' => 'emily@example.com',
                'password' => 'password',
                'role' => UserRole::AUTHOR,
                'bio' => 'Technical writer and software engineer. I break down complex topics into digestible content for developers.',
            ],
            [
                'username' => 'alex_backend',
                'name' => 'Alex Kumar',
                'email' => 'alex@example.com',
                'password' => 'password',
                'role' => UserRole::AUTHOR,
                'bio' => 'Backend engineer specializing in API design, database optimization, and system architecture.',
            ],
            [
                'username' => 'jessica_ux',
                'name' => 'Jessica Martinez',
                'email' => 'jessica@example.com',
                'password' => 'password',
                'role' => UserRole::AUTHOR,
                'bio' => 'UX engineer bridging the gap between design and development. Advocate for accessible and intuitive interfaces.',
            ],
            [
                'username' => 'david_devops',
                'name' => 'David Thompson',
                'email' => 'david@example.com',
                'password' => 'password',
                'role' => UserRole::AUTHOR,
                'bio' => 'DevOps engineer focused on CI/CD, containerization, and cloud infrastructure. Kubernetes enthusiast.',
            ],
            [
                'username' => 'lisa_mobile',
                'name' => 'Lisa Park',
                'email' => 'lisa@example.com',
                'password' => 'password',
                'role' => UserRole::AUTHOR,
                'bio' => 'Mobile developer working with React Native and Flutter. Building cross-platform experiences that users love.',
            ],
            [
                'username' => 'james_security',
                'name' => 'James Wilson',
                'email' => 'james@example.com',
                'password' => 'password',
                'role' => UserRole::AUTHOR,
                'bio' => 'Security researcher and ethical hacker. Teaching developers how to write secure code and protect user data.',
            ],
        ];

        $createdUsers = [];

        foreach ($users as $user) {
            $createdUsers[] = User::query()->create($user);
        }

        // Create some following relationships
        $sarah = User::query()->where('username', 'sarah_dev')->first();
        $mike = User::query()->where('username', 'mike_tech')->first();
        $emily = User::query()->where('username', 'emily_writes')->first();
        $alex = User::query()->where('username', 'alex_backend')->first();
        $jessica = User::query()->where('username', 'jessica_ux')->first();
        $david = User::query()->where('username', 'david_devops')->first();
        $lisa = User::query()->where('username', 'lisa_mobile')->first();
        $james = User::query()->where('username', 'james_security')->first();

        // Sarah follows everyone (she's the admin and active)
        $sarah->following()->attach([$mike->id, $emily->id, $alex->id, $jessica->id, $david->id, $lisa->id, $james->id]);

        // Mike follows frontend and mobile people
        $mike->following()->attach([$sarah->id, $jessica->id, $lisa->id]);

        // Emily follows a diverse group
        $emily->following()->attach([$sarah->id, $mike->id, $alex->id, $james->id]);

        // Alex follows backend and devops people
        $alex->following()->attach([$sarah->id, $david->id, $james->id]);

        // Jessica follows design-minded and frontend people
        $jessica->following()->attach([$sarah->id, $mike->id, $lisa->id]);

        // David follows infrastructure people
        $david->following()->attach([$sarah->id, $alex->id, $james->id]);

        // Lisa follows mobile and frontend people
        $lisa->following()->attach([$sarah->id, $mike->id, $jessica->id]);

        // James follows security-conscious people
        $james->following()->attach([$sarah->id, $alex->id, $david->id]);
    }
}
