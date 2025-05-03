<?php

namespace Tests\Feature\Interview;

use App\Models\InterviewQuestion;
use App\Models\InterviewSession;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ViewSessionDetailsTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_view_interview_session_details()
    {
        //create user,session and questions
        $user = User::factory()->create();
        $session = InterviewSession::factory()->create(['user_id' => $user->id]);
        InterviewQuestion::factory()->count(2)->create(['session_id' => $session->id]);

        //get interview session details
        $response = $this->jwtAuth($user)->getJson("/api/v1/interview/{$session->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'payload' => [
                    'id',
                    'user_id',
                    'job_title',
                    'ai_feedback',
                    'created_at',
                    'questions' => [
                        ['id', 'session_id', 'question', 'user_answer', 'created_at', 'updated_at'],
                    ]
                ]
            ]);
    }
}
