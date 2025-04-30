<?php

namespace App\Http\Controllers;

use App\Services\InterviewQuestionService;

class InterviewQuestionController extends Controller
{
    protected $Service;

    public function __construct(InterviewQuestionService $Service)
    {
        $this->Service = $Service;
    }
}
