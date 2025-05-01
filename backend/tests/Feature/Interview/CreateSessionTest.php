<?php

namespace Tests\Feature\Interview;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateSessionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_interview_session()
    {
        //create user
        $user = User::factory()->create();

        //test if created user can create an interview session
        $response = $this->actingAs($user)->postJson('/api/v1/interview', [
            'job_title' => 'Software Engineer',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'user_id',
                'job_title',
                'ai_feedback',
                'created_at',
            ]);

        $this->assertDatabaseHas('interview_sessions', [
            'user_id' => $user->id,
            'job_title' => 'Software Engineer',
        ]);
    }
}
