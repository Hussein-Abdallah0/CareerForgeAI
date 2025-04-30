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

    public function createSession(CreateInterviewRequest $request)
    {
        try {
            $session = $this->Service->createSession($request);
            return $this->successResponse($session, 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to create session: " . $e->getMessage(), 500);
        }
    }

    public function finishSession(CreateInterviewRequest $request, $session_id)
    {
        try {
            return $this->successResponse("$", 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to finish session: " . $e->getMessage(), 500);
        }
    }
}
