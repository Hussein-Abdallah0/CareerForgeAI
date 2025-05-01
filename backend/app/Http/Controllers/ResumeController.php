<?php

namespace App\Http\Controllers;

use App\Services\ResumeService;
use Illuminate\Http\Request;

class ResumeController extends Controller
{
    protected $Service;

    public function __construct(ResumeService $Service)
    {
        $this->Service = $Service;
    }
}
