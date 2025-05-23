<?php

namespace Tests\Feature\Interview;

use App\Models\InterviewQuestion;
use App\Models\InterviewSession;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AnswerQuestionTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_answer_a_question()
    {
        //create user and question
        $user = User::factory()->create();
        $question = InterviewQuestion::factory()->create([
            'session_id' => InterviewSession::factory()->create(['user_id' => $user->id])->id,
        ]);

        //answer question
        $response = $this->jwtAuth($user)->patchJson("/api/v1/question/{$question->id}/answer", [
            'user_answer' => 'I am passionate about software engineering.',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'payload' => [
                    'id',
                    'session_id',
                    'question',
                    'user_answer', // Check structure exists
                    'created_at',
                    'updated_at',
                ]
            ])
            ->assertJsonFragment([
                'user_answer' => 'I am passionate about software engineering.'
            ]);

        $this->assertDatabaseHas('interview_questions', [
            'id' => $question->id,
            'user_answer' => 'I am passionate about software engineering.',
        ]);
    }
}
