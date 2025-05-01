<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateResumeRequest;
use App\Services\ResumeService;

class ResumeController extends Controller
{
    protected $Service;

    public function __construct(ResumeService $Service)
    {
        $this->Service = $Service;
    }

    public function createResume(CreateResumeRequest $request)
    {
        try {
            $resume = $this->Service->createResume($request);
            return $this->successResponse($resume, 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to create resume: " . $e->getMessage(), 500);
        }
    }

    public function viewResume($resume_id)
    {
        try {
            $resume = $this->Service->viewResume($resume_id);
            return $this->successResponse($resume, 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to fetch resume: " . $e->getMessage(), 500);
        }
    }
}
