<?php

namespace Tests\Feature\Interview;

use App\Models\InterviewSession;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AddQuestionTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_add_question_to_session()
    {
        // create user and session for this user
        $user = User::factory()->create();
        $session = InterviewSession::factory()->create(['user_id' => $user->id]);

        //add question
        $response = $this->jwtAuth($user)->postJson("/api/v1/interview/{$session->id}/question", [
            'question' => 'Tell me about yourself.',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'payload' => [
                    'id',
                    'session_id',
                    'question',
                    'created_at',
                    'updated_at',
                ]
            ]);

        $this->assertDatabaseHas('interview_questions', [
            'session_id' => $session->id,
            'question' => 'Tell me about yourself.',
        ]);
    }
}
