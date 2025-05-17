<?php

namespace Database\Seeders;

use App\Models\Tip;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Tip::factory()
            ->count(20)
            ->create();
    }
}
