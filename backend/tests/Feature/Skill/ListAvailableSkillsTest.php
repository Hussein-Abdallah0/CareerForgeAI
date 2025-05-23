<?php

namespace Tests\Feature\Skill;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Tests\TestCase;

class ListAvailableSkillsTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_list_available_skills()
    {
        $user = User::factory()->create();

        Skill::create(['name' => 'Laravel']);
        Skill::create(['name' => 'Vue.js']);
        Skill::create(['name' => 'React']);

        $response = $this->jwtAuth($user)
            ->getJson('/api/v1/skill/available');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'payload' => [
                    ['name' => 'Laravel'],
                    ['name' => 'Vue.js'],
                    ['name' => 'React']
                ]
            ]);
    }

    public function test_returns_empty_array_when_no_skills_exist()
    {
        $user = User::factory()->create();

        $response = $this->jwtAuth($user)
            ->getJson('/api/v1/skill/available');

        $response->assertStatus(200)
            ->assertJson([]);
    }
}
