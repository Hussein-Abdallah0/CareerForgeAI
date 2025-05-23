<?php

namespace App\Services;

use App\Models\SalaryAnalysis;
use Illuminate\Support\Facades\Auth;

class SalaryAnalysisService
{

    public function createAnalysis($request)
    {
        $user_id = Auth::id();

        return SalaryAnalysis::create([
            'user_id' => $user_id,
            'job_title' => $request->job_title,
            'location' => $request->location,
            'experience_level' => $request->experience_level,
            'current_salary' => $request->current_salary,
            'suggested_range' => $request->suggested_range,
        ]);
    }

    public function viewAnalysis($analysis_id)
    {
        return SalaryAnalysis::where('user_id', Auth::id())
            ->findOrFail($analysis_id);
    }

    public function listAnalysis($user_id)
    {
        return SalaryAnalysis::where('user_id', $user_id)->get();
    }

    public function deleteAnalysis($analysis_id)
    {
        //used this not destroy since destroy fails silently
        $analysis = SalaryAnalysis::where('user_id', Auth::id())
            ->findOrFail($analysis_id);
        $analysis->delete();
    }
}
