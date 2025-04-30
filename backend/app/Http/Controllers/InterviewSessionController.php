<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateInterviewRequest;
use App\Services\InterviewSessionService;
use Illuminate\Http\Request;

class InterviewSessionController extends Controller
{
    protected $Service;

    public function __construct(InterviewSessionService $Service)
    {
        $this->Service = $Service;
    }

    public function createSession(CreateInterviewRequest $request) {}
}
