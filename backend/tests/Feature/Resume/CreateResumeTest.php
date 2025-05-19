<?php

namespace Tests\Feature\Resume;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CreateResumeTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_create_resume()
    {
        $user = User::factory()->create();

        $resumeData = [
            'summary' => 'Experienced backend developer with Laravel expertise',
            'job_title' => 'Backend Developer',
            'experience' => [
                [
                    'company' => 'Tech Corp',
                    'position' => 'Developer',
                    'start_date' => '2020-01-01',
                    'end_date' => '2023-12-31',
                    'description' => 'Developed web applications'
                ]
            ],
            'education' => [
                [
                    'institution' => 'State University',
                    'degree' => 'Bachelor',
                    'field_of_study' => 'Computer Science',
                    'start_date' => '2015-09-01',
                    'end_date' => '2019-05-30'
                ]
            ]
        ];

        $response = $this->jwtAuth($user)
            ->postJson('/api/v1/resume', $resumeData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'payload' => [
                    'id',
                    'user_id',
                    'summary',
                    'job_title',
                    'experience',
                    'education',
                    'created_at',
                    'updated_at'
                ]
            ]);

        $this->assertDatabaseHas('resumes', [
            'user_id' => $user->id,
            'job_title' => 'Backend Developer'
        ]);
    }
}
