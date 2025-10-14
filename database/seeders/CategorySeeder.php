<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $this->factory();
    }

    /**
     * Use the factory to create categories.
     */
    private function factory(): void
    {
        Category::factory(5)->create();
    }
}
