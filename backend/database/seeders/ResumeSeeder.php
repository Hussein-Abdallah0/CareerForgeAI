<?php

namespace Database\Seeders;

use App\Models\Resume;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResumeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create 3 resumes for each user
        User::all()->each(function ($user) {
            Resume::factory()->count(3)->create([
                'user_id' => $user->id
            ]);
        });

        // Create a specific test resume for the test user
        $testUser = User::where('email', 'test@example.com')->first();
        Resume::factory()->create([
            'user_id' => $testUser->id,
            'job_title' => 'Senior Software Engineer',
            'skills' => 'PHP, Laravel, JavaScript, Vue.js, MySQL',
        ]);
    }
}
