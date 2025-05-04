<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSkillRequest;
use App\Services\SkillService;
use Illuminate\Support\Facades\Auth;

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

    public function listUserSkills()
    {
        $user_id = Auth::id();
        $function = fn() => $this->Service->listUserSkills($user_id);
        return $this->tryCatchResponse($function, 200, 'Failed to fetch user skills');
    }

    public function addSkill(CreateSkillRequest $request) {}
}
