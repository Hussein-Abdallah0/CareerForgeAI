<?php

namespace App\Services;

use App\Models\InterviewQuestion;

class InterviewQuestionService
{

    public function createQuestion($request, $sessionId)
    {
        return InterviewQuestion::create([
            'session_id' => $sessionId,
            'question' => $request->question,
        ]);
    }

    public function answerQuestion($request, $questionId)
    {
        $question = InterviewQuestion::findOrFail($questionId);

        $question->update([
            'answer' => $request->answer,
            'updated_at' => now(),
        ]);

        return $question;
    }
}
