<?php

namespace Tests\Feature\Resume;

use App\Models\Resume;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ViewResumeTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_view_single_resume()
    {
        // create user and resume
        $user = User::factory()->create();
        $resume = Resume::factory()->create(['user_id' => $user->id]);

        //get resume
        $response = $this->jwtAuth($user)->getJson("/api/v1/resume/{$resume->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'payload' => [
                    'id',
                    'job_title',
                    'experience',
                    'skills',
                    'education',
                ]
            ])
            ->assertJson([
                'payload' => [
                    'id' => $resume->id,
                    'job_title' => $resume->job_title
                ]
            ]);
    }
}
