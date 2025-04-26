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
        // For each user, create 1 resume
        User::all()->each(function ($user) {
            Resume::factory()->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
