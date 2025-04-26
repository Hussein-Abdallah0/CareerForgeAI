<?php

namespace Database\Seeders;

use App\Models\InterviewQuestion;
use App\Models\InterviewSession;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InterviewQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // For each interview session, create 5 questions
        InterviewSession::all()->each(function ($session) {
            InterviewQuestion::factory(5)->create([
                'session_id' => $session->id,
            ]);
        });
    }
}
