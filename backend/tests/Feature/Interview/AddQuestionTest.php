<?php

namespace Tests\Feature\Interview;

use App\Models\InterviewSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AddQuestionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_add_question_to_session()
    {
        //create user and session for this user
        $user = User::factory()->create();
        $session = InterviewSession::factory()->create(['user_id' => $user->id]);

        //add question
        $response = $this->actingAs($user)->postJson("/api/interviews/{$session->id}/questions", [
            'question' => 'Tell me about yourself.',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'session_id',
                'question',
                'user_answer',
                'ai_comment',
                'created_at',
                'updated_at',
            ]);

        $this->assertDatabaseHas('interview_questions', [
            'session_id' => $session->id,
            'question' => 'Tell me about yourself.',
        ]);
    }
}
