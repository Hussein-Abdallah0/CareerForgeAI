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

    public function addUserSkill(CreateSkillRequest $request)
    {
        $user_id = Auth::id();
        $function = fn() => $this->Service->addUserSkill($user_id, $request->skill_name, $request->proficiency ?? 1);
        return $this->tryCatchResponse($function, 201, 'Failed to add skill to user');
    }

    public function removeUserSkill($skill_id)
    {
        $user_id = Auth::id();
        $function = fn() => $this->Service->removeUserSkill($user_id, $skill_id);
        return $this->tryCatchResponse($function, 200, 'Failed to remove skill from user');
    }
}
