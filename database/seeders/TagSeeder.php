<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $this->factory();
    }

    /**
     * Run the factory to create tags.
     */
    private function factory(): void
    {
        Tag::factory()->count(30)->create();
    }
}
