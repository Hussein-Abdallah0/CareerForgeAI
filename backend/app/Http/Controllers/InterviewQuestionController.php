<?php

namespace App\Http\Controllers;

use App\Http\Requests\interview\AnswerQuestionRequest;
use App\Http\Requests\interview\CreateQuestionRequest;
use App\Services\InterviewQuestionService;

class InterviewQuestionController extends Controller
{
    protected $Service;

    public function __construct(InterviewQuestionService $Service)
    {
        $this->Service = $Service;
    }

    public function addQuestion(CreateQuestionRequest $request, $session_id)
    {
        $function = fn() => $this->Service->createQuestion($request, $session_id);
        return $this->tryCatchResponse($function, 201, 'Failed to add question:');
    }

    public function answerQuestion(AnswerQuestionRequest $request, $question_id)
    {
        $function = fn() => $this->Service->answerQuestion($request, $question_id);
        return $this->tryCatchResponse($function, 200, 'Failed to answer question:');
    }
}
