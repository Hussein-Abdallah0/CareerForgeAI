<?php

namespace App\Services;

use App\Models\InterviewSession;

class InterviewSessionService
{

    public function createSession($request)
    {
        $user = $request->user();

        $session = InterviewSession::create([
            'user_id' => $user->id,
            'job_title' => $request->job_title,
        ]);

        return $session;
    }
}
