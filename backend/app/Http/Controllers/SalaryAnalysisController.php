<?php

namespace App\Http\Controllers;

use App\Services\SalaryAnalysisService;

class SalaryAnalysisController extends Controller
{
    protected $Service;

    public function __construct(SalaryAnalysisService $Service)
    {
        $this->Service = $Service;
    }
}
