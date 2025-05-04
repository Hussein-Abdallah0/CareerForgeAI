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
        $skill1 = Skill::factory()->create(['name' => 'Laravel']);
        $skill2 = Skill::factory()->create(['name' => 'Vue.js']);
        $user->skills()->attach([$skill1->id, $skill2->id], ['proficiency' => 3]);

        $response = $this->jwtAuth($user)
            ->getJson('/api/v1/skill');

        $response->assertStatus(200)
            ->assertJsonCount(2);
    }

    public function test_returns_empty_array_when_user_has_no_skills()
    {
        $user = User::factory()->create();

        $response = $this->jwtAuth($user)
            ->getJson('/api/v1/skill');

        $response->assertStatus(200)
            ->assertJson([]);
    }
}
