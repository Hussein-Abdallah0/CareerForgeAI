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
        $function = fn() => $this->Service->viewResume($resume_id);
        return $this->tryCatchResponse($function, 200, 'Failed to fetch resume');
    }

    public function listResumes()
    {
        $user = Auth::user();
        $function = fn() => $this->Service->listResumes($user->id);
        return $this->tryCatchResponse($function, 200, 'Failed to fetch resumes');
    }

    public function deleteResume($resume_id)
    {
        $function = fn() => $this->Service->deleteResume($resume_id);
        return $this->tryCatchResponse($function, 200, 'Failed to delete resume');
    }
}
