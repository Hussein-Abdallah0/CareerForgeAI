<?php

namespace App\Services;

use App\Models\Resume;

class ResumeService
{

    public function createResume($request)
    {
        return Resume::create([
            'summary' => $request->summary,
            'job_title' => $request->job_title,
            'experience' => $request->experience,
            'skills' => $request->skills,
            'education' => $request->education,
        ]);
    }
}
