<?php

namespace App\Http\Controllers;

use App\Http\Requests\Resume\CreateResumeRequest;
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
        $function = fn() => $this->Service->createResume($request);
        return $this->tryCatchResponse($function, 201, 'Failed to create resume');
    }

    public function viewResume($resume_id)
    {
        try {
            $resume = $this->Service->viewResume($resume_id);
            return $this->successResponse($resume, 200);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to fetch resume: " . $e->getMessage(), 500);
        }
    }

    public function listResumes()
    {
        try {
            $user = Auth::user();
            $resumes = $this->Service->listResumes($user->id);
            return $this->successResponse($resumes, 200);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to fetch resumes: " . $e->getMessage(), 500);
        }
    }

    public function deleteResume($resume_id)
    {
        try {
            $this->Service->deleteResume($resume_id);
            return $this->successResponse("Resume deleted successfully", 200);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to fetch resumes: " . $e->getMessage(), 500);
        }
    }
}
