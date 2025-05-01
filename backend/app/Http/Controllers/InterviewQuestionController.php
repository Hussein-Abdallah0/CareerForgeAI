<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnswerQuestionRequest;
use App\Http\Requests\CreateQuestionRequest;
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
        try {
            $question = $this->Service->createQuestion($request, $session_id);
            return $this->successResponse($question, 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to add question: " . $e->getMessage(), 500);
        }
    }

    public function answerQuestion(AnswerQuestionRequest $request, $question_id)
    {
        try {
            $question = $this->Service->answerQuestion($request, $question_id);
            return $this->successResponse($question, 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to answer question: " . $e->getMessage(), 500);
        }
    }
}
