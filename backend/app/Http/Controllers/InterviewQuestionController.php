<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateInterviewRequest;
use App\Services\InterviewQuestionService;

class InterviewQuestionController extends Controller
{
    protected $Service;

    public function __construct(InterviewQuestionService $Service)
    {
        $this->Service = $Service;
    }

    public function addInterviewQuestion(CreateInterviewRequest $request) {}
}
