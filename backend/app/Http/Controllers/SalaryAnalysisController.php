<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAnalysisRequest;
use App\Services\SalaryAnalysisService;
use Illuminate\Support\Facades\Auth;

class SalaryAnalysisController extends Controller
{
    protected $Service;

    public function __construct(SalaryAnalysisService $Service)
    {
        $this->Service = $Service;
    }

    public function createSalaryAnalysis(CreateAnalysisRequest $request)
    {
        $function = fn() => $this->Service->createAnalysis($request);
        return $this->tryCatchResponse($function, 201, 'Failed to create analysis');
    }

    public function viewSalaryAnalysis($analysis_id)
    {
        $function = fn() => $this->Service->viewAnalysis($analysis_id);
        return $this->tryCatchResponse($function, 200, 'Failed to fetch analysis');
    }

    public function listSalaryAnalysis()
    {
        $user = Auth::user();
        $function = fn() => $this->Service->listAnalysis($user->id);
        return $this->tryCatchResponse($function, 200, 'Failed to fetch analysis');
    }
}
