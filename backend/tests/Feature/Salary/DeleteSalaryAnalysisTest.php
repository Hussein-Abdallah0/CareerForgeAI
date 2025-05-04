<?php

namespace Tests\Feature\Salary;

use App\Models\SalaryAnalysis;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteSalaryAnalysisTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_delete_salary_analysis()
    {
        //create user and analysis
        $user = User::factory()->create();
        $salaryAnalysis = SalaryAnalysis::factory()->create(['user_id' => $user->id]);

        //delete analysis
        $response = $this->jwtAuth($user)->deleteJson("/api/v1/analysis/{$salaryAnalysis->id}");

        $response->assertStatus(200);

        $this->assertDatabaseMissing('salary_analysis', [
            'id' => $salaryAnalysis->id,
        ]);
    }
}
