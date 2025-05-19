<?php

namespace Database\Seeders;

use App\Models\SalaryAnalysis;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalaryAnalysisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // For each user, create 1 salary analysis
        User::all()->each(function ($user) {
            SalaryAnalysis::factory()->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
