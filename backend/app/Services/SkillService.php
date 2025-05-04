<?php

namespace App\Services;

use App\Models\Skill;
use App\Models\User;

class SkillService
{
    public function listAvailableSkills()
    {
        return Skill::all();
    }

    public function listUserSkills($user_id)
    {
        return User::findOrFail($user_id)->skills()->get();
    }

    public function addUserSkill($user_id, $skill_name, $proficiency)
    {
        $skill = Skill::firstOrCreate(['name' => $skill_name]);
        $user = User::findOrFail($user_id);

        if ($user->skills()->where('skill_id', $skill->id)->exists()) {
            throw new \Exception('User already has this skill', 400);
        }

        $user->skills()->attach($skill->id, ['proficiency' => $proficiency]);
        return $user->skills()->where('skill_id', $skill->id)->first();
    }

    public function removeUserSkill($user_id, $skill_id)
    {
        $user = User::findOrFail($user_id);
        $user->skills()->detach($skill_id);
        return ['message' => 'Skill removed successfully'];
    }
}
