<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class SkillService
{

    public function addUserSkill($user_id, $skill_id, $proficiency)
    {
        $user = User::findOrFail($user_id);

        if ($user->skills()->where('skill_id', $skill_id)->exists()) {
            throw new \Exception('User already has this skill', 400);
        }

        $user->skills()->attach($skill_id, ['proficiency' => $proficiency]);
        return $user->skills()->where('skill_id', $skill_id)->first();
    }
}
