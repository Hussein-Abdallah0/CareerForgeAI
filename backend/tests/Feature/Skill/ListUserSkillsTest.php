<?php

namespace Tests\Feature\Skill;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ListUserSkillsTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_list_their_skills()
    {
        $user = User::factory()->create();
        $skills = Skill::factory()->count(2)->create();
        $user->skills()->attach($skills, ['proficiency' => 3]);

        $response = $this->jwtAuth($user)
            ->getJson('/api/v1/skill');

        $response->assertStatus(200)
            ->assertJsonCount(2)
            ->assertJsonStructure([
                '*' => ['id', 'name', 'pivot' => ['proficiency']]
            ]);
    }
}
