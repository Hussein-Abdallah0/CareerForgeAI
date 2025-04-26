<?php

namespace Database\Seeders;

use App\Models\InterviewSession;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InterviewSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 2 interviews for each user
        User::all()->each(function ($user) {
            InterviewSession::factory()->count(2)->create([
                'user_id' => $user->id
            ]);
        });
    }
}
