<?php

namespace Tests\Feature\Skill;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class RemoveUserSkillTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_remove_skill()
    {
        $user = User::factory()->create();
        $skill = Skill::factory()->create(['name' => 'Django']);
        $user->skills()->attach($skill->id, ['proficiency' => 3]);

        $response = $this->jwtAuth($user)
            ->deleteJson("/api/v1/skill/{$skill->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'payload' => [
                    'message' => 'Skill removed successfully'
                ]
            ]);

        $this->assertDatabaseMissing('skill_user', [
            'user_id' => $user->id,
            'skill_id' => $skill->id
        ]);
    }

    public function test_skill_remains_in_available_skills_after_removal()
    {
        $user = User::factory()->create();
        $skill = $user->skills()->create(['name' => 'Flask']);

        $this->jwtAuth($user)
            ->deleteJson("/api/v1/skill/{$skill->id}");

        $this->assertDatabaseHas('skills', ['id' => $skill->id]);
    }

    public function test_cannot_remove_nonexistent_skill()
    {
        $user = User::factory()->create();

        $response = $this->jwtAuth($user)
            ->deleteJson("/api/v1/skill/999");

        $response->assertStatus(404);
    }
}
