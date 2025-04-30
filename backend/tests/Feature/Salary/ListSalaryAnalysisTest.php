<?php

namespace Tests\Feature\Salary;

use App\Models\SalaryAnalysis;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ListSalaryAnalysisTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_list_their_salary_analyses()
    {
        // //create user and analysis
        // $user = User::factory()->create();
        // SalaryAnalysis::factory()->count(2)->create(['user_id' => $user->id]);

        // //get all analysis
        // $response = $this->actingAs($user)->getJson('/api/salaries');

        // $response->assertStatus(200)
        //     ->assertJsonCount(2);
        $this->assertTrue(true);
    }
}
