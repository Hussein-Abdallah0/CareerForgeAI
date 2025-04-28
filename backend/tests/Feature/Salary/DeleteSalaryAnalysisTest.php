<?php

namespace Tests\Feature\Salary;

use App\Models\SalaryAnalysis;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteSalaryAnalysisTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_delete_salary_analysis()
    {
        //create user and analysis
        $user = User::factory()->create();
        $salaryAnalysis = SalaryAnalysis::factory()->create(['user_id' => $user->id]);

        //delete analysis
        $response = $this->actingAs($user)->deleteJson("/api/salaries/{$salaryAnalysis->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('salary_analysis', [
            'id' => $salaryAnalysis->id,
        ]);
    }
}
