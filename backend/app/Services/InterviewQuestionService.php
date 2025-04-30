<?php

namespace App\Services;

use App\Models\InterviewQuestion;

class InterviewQuestionService
{

    public function createQuestion($request)
    {
        $user = $request->user();

        $session = InterviewQuestion::create([
            'user_id' => $user->id,
            'job_title' => $request->job_title,
            'ai_feedback' => '', // initially empty
        ]);

        return $session;
    }
}
