<?php

namespace App\Services;

use App\Models\InterviewQuestion;

class InterviewQuestionService
{

    public function createQuestion($request)
    {
        $question = InterviewQuestion::create([
            'session_id' => $request->session_id,
            'question' => $request->question,
        ]);

        return $question;
    }
}
