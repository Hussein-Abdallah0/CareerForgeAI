<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSkillRequest;
use App\Services\SkillService;

class SkillController extends Controller
{
    protected $Service;

    public function __construct(SkillService $Service)
    {
        $this->Service = $Service;
    }

    public function addSkill(CreateSkillRequest $request) {}
}
