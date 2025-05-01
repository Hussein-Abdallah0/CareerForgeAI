<?php

namespace App\Services;

use App\Models\InterviewQuestion;

class InterviewQuestionService
{

    public function createQuestion($request, $session_id)
    {
        return InterviewQuestion::create([
            'session_id' => $session_id,
            'question' => $request->question,
        ]);
    }

    public function answerQuestion($request, $question_id)
    {
        $question = InterviewQuestion::findOrFail($question_id);

        $question->update([
            'user_answer' => $request->user_answer,
            'updated_at' => now(),
        ]);

        return $question;
    }
}
