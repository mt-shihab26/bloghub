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
        // $this->factory();

        User::factory()->create([
            'username' => 'test-user',
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => UserRole::ADMIN->value,
        ]);
    }

    /**
     * Run the factory to create users.
     */
    private function factory(): void
    {
        User::factory(10)->create();
    }
}
