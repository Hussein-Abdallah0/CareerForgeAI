<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAnalysisRequest;
use App\Services\SalaryAnalysisService;

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
}
