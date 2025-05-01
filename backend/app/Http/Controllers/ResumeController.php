<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateResumeRequest;
use App\Services\ResumeService;
use Illuminate\Support\Facades\Auth;

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

    public function listResumes()
    {
        try {
            $user_id = Auth::user();
            $resumes = $this->Service->listResumes($user_id);
            return $this->successResponse($resumes, 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to fetch resumes: " . $e->getMessage(), 500);
        }
    }

    public function deleteResume($resume_id)
    {
        try {
            $this->Service->deleteResume($resume_id);
            return $this->successResponse("Resume deleted successfully", 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to fetch resumes: " . $e->getMessage(), 500);
        }
    }
}
