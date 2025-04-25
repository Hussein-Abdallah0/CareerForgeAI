<?php

namespace Database\Seeders;

use App\Models\Interview;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InterviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 2 interviews for each user
        User::all()->each(function ($user) {
            Interview::factory()->count(2)->create([
                'user_id' => $user->id
            ]);
        });

        // Create a specific test interview
        $testUser = User::where('email', 'test@example.com')->first();
        Interview::factory()->create([
            'user_id' => $testUser->id,
            'job_role' => 'Tech Lead',
            'feedback' => 'Excellent technical skills but needs more leadership experience',
        ]);
    }
}
