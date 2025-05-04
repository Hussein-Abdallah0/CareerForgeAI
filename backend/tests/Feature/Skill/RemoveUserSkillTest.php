<?php

namespace Tests\Feature\Skill;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class RemoveUserSkillTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_remove_skill()
    {
        $user = User::factory()->create();
        $skill = $user->skills()->create(['name' => 'Django']);

        $response = $this->jwtAuth($user)
            ->deleteJson("/api/v1/skills/user/{$skill->id}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Skill removed successfully']);

        $this->assertDatabaseMissing('skill_user', [
            'user_id' => $user->id,
            'skill_id' => $skill->id
        ]);
    }
}
