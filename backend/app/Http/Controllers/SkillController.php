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

    public function listAvailableSkills()
    {
        $function = fn() => $this->Service->listAvailableSkills();
        return $this->tryCatchResponse($function, 200, 'Failed to fetch available skills');
    }

    public function addSkill(CreateSkillRequest $request) {}
}
