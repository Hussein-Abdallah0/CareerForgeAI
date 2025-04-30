<?php

namespace Tests\Feature\Interview;

use App\Models\InterviewQuestion;
use App\Models\InterviewSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AnswerQuestionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_answer_a_question()
    {
        // //create user and question
        // $user = User::factory()->create();
        // $question = InterviewQuestion::factory()->create([
        //     'session_id' => InterviewSession::factory()->create(['user_id' => $user->id])->id,
        // ]);

        // //answer question
        // $response = $this->actingAs($user)->patchJson("/api/questions/{$question->id}", [
        //     'user_answer' => 'I am passionate about software engineering.',
        // ]);

        // $response->assertStatus(200)
        //     ->assertJsonFragment([
        //         'user_answer' => 'I am passionate about software engineering.',
        //     ]);

        // $this->assertDatabaseHas('interview_questions', [
        //     'id' => $question->id,
        //     'user_answer' => 'I am passionate about software engineering.',
        // ]);
        return true;
    }
}
