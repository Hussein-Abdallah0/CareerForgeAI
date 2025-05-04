<?php

namespace Tests\Feature\Salary;

use App\Models\SalaryAnalysis;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ViewSalaryAnalysisTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_view_single_salary_analysis()
    {
        //create user and analysis
        $user = User::factory()->create();
        $salaryAnalysis = SalaryAnalysis::factory()->create(['user_id' => $user->id]);

        //get analysis
        $response = $this->jwtAuth($user)->getJson("/api/v1/analysis/{$salaryAnalysis->id}");

        $response->assertStatus(200)
            ->assertJson([
                'id' => $salaryAnalysis->id,
                'job_title' => $salaryAnalysis->job_title,
                'location' => $salaryAnalysis->location,
                'experience_level' => $salaryAnalysis->experience_level,
                'current_salary' => $salaryAnalysis->current_salary,
                'suggested_range' => $salaryAnalysis->suggested_range,
            ]);
    }

    public function test_user_cannot_view_another_users_analysis()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $salaryAnalysis = SalaryAnalysis::factory()->create(['user_id' => $user1->id]);

        $response = $this->jwtAuth($user2)->getJson("/api/v1/analysis/{$salaryAnalysis->id}");
        $response->assertStatus(403);
    }
}
