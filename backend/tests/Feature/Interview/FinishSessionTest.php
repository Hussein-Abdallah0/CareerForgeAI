<?php

namespace Tests\Feature\Interview;

use App\Models\InterviewSession;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FinishSessionTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_finish_interview_session()
    {
        //create user and session
        $user = User::factory()->create();
        $session = InterviewSession::factory()->create([
            'user_id' => $user->id,
            'ai_feedback' => '',
        ]);

        //finish session and get feedback
        $response = $this->jwtAuth($user)->patchJson("/api/v1/interview/{$session->id}/finish", [
            'ai_feedback' => 'Sample feedback'
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'payload' => [
                    'id',
                    'user_id',
                    'job_title',
                    'ai_feedback',
                    'created_at',
                ]
            ]);

        $this->assertDatabaseMissing('interview_sessions', [
            'id' => $session->id,
            'ai_feedback' => '', // Make sure feedback is no longer empty
        ]);
    }
}
