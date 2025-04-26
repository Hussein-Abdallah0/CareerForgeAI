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
        // Make sure you have interview sessions first!
        $sessions = InterviewSession::all();

        foreach ($sessions as $session) {
            InterviewQuestion::factory()
                ->count(5) // 5 questions per session
                ->create([
                    'session_id' => $session->id,
                ]);
        }
    }
}
