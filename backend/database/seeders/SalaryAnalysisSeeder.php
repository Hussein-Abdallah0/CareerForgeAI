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
        // Create 1 salary analysis for each user
        User::all()->each(function ($user) {
            SalaryAnalysis::factory()->create([
                'user_id' => $user->id
            ]);
        });

        // Create a detailed analysis for test user
        $testUser = User::where('email', 'test@example.com')->first();
        SalaryAnalysis::factory()->create([
            'user_id' => $testUser->id,
            'job_title' => 'Senior Software Engineer',
            'location' => 'San Francisco, CA',
            'experience_level' => 'Senior',
            'suggested_range' => '$120k - $160k',
            'market_analysis' => 'Competitive salary for SF area with 5+ years experience',
        ]);
    }
}
