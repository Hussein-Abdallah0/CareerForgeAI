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

    public function createInterviewSession(CreateInterviewRequest $request)
    {
        try {
            $this->Service->createSession($request);
            return $this->successResponse("session created", 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to create session: " . $e->getMessage(), 500);
        }
    }
}
