<?php

namespace Tests\Feature\Skill;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AddUserSkillTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_add_new_skill()
    {
        $user = User::factory()->create();

        $response = $this->jwtAuth($user)
            ->postJson('/api/v1/skills/user', [
                'skill_name' => 'Laravel',
                'proficiency' => 4
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'payload' => [
                    'id',
                    'name',
                    'pivot' => ['proficiency']
                ]
            ]);

        $this->assertDatabaseHas('skills', ['name' => 'Laravel']);
        $this->assertDatabaseHas('skill_user', [
            'user_id' => $user->id,
            'proficiency' => 4
        ]);
    }
}
