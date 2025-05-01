<?php

namespace App\Services;

use App\Models\Resume;
use Illuminate\Support\Facades\Auth;

class ResumeService
{
    public function createResume($request)
    {
        $user_id = Auth::id(); // Get the authenticated user's ID

        return Resume::create([
            'user_id' => $user_id,
            'summary' => $request->summary,
            'job_title' => $request->job_title,
            'experience' => $request->experience,
            'skills' => $request->skills,
            'education' => $request->education,
        ]);
    }

    public function viewResume($resume_id)
    {
        return Resume::findOrFail($resume_id);
    }

    public function listResumes($user_id)
    {
        return Resume::where('user_id', $user_id)->get();
    }

    public function deleteResume($resume_id)
    {
        //used this not destroy since destroy fails silently
        $resume = Resume::findOrFail($resume_id);
        $resume->delete();
    }
}
