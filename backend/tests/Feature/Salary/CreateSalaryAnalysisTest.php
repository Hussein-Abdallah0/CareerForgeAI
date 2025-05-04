<?php

namespace Tests\Feature\Salary;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CreateSalaryAnalysisTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_create_salary_analysis()
    {
        //create user
        $user = User::factory()->create();

        //create analysis
        $response = $this->jwtAuth($user)->postJson('/api/v1/analysis', [
            'job_title' => 'Software Engineer',
            'location' => 'New York',
            'experience_level' => 'Mid-Level',
            'current_salary' => 85000.00,
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'user_id',
                'job_title',
                'location',
                'experience_level',
                'current_salary',
                'suggested_range',
                'created_at'
            ]);

        $this->assertDatabaseHas('salary_analysis', [
            'user_id' => $user->id,
            'job_title' => 'Software Engineer',
            'location' => 'New York',
        ]);
    }
}
