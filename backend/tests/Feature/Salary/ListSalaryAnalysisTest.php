<?php

namespace Tests\Feature\Salary;

use App\Models\SalaryAnalysis;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ListSalaryAnalysisTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_list_their_salary_analyses()
    {
        //create user and analysis
        $user = User::factory()->create();
        SalaryAnalysis::factory()->count(2)->create(['user_id' => $user->id]);

        //get all analysis
        $response = $this->jwtAuth($user)->getJson('/api/v1/analysis');

        $response->assertStatus(200)
            ->assertJsonCount(2);
    }
}
