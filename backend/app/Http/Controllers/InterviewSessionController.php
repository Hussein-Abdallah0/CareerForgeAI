<?php

namespace App\Http\Controllers;

use App\Http\Requests\interview\CreateInterviewRequest;
use App\Http\Requests\interview\FinishInterviewRequest;
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
        $function = fn() => $this->Service->createSession($request);
        return $this->tryCatchResponse($function, 201, 'Failed to create session');
    }

    public function finishSession(FinishInterviewRequest $request, $session_id)
    {
        try {
            $session = $this->Service->finishSession($request, $session_id);
            return $this->successResponse($session, 200);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to finish session: " . $e->getMessage(), 500);
        }
    }

    public function viewSessionDetails($session_id)
    {
        $function = fn() => $this->Service->getSession($session_id);
        return $this->tryCatchResponse($function, 200, 'Failed to fetch session details');
    }
}
