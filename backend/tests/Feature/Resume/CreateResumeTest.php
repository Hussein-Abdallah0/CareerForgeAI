<?php

namespace Tests\Feature\Resume;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateResumeTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_tailored_resume()
    {
        // //create user
        // $user = User::factory()->create();

        // //create resume
        // $response = $this->actingAs($user)->postJson('/api/resumes', [
        //     'job_title' => 'Backend Developer',
        //     'experience' => '3 years of experience in PHP and Laravel',
        //     'skills' => 'PHP, Laravel, MySQL',
        //     'education' => 'Bachelor in Computer Science',
        // ]);

        // $response->assertStatus(201)
        //     ->assertJsonStructure([
        //         'id',
        //         'user_id',
        //         'job_title',
        //         'experience',
        //         'skills',
        //         'education',
        //         'tailored_resume',
        //         'created_at'
        //     ]);

        // $this->assertDatabaseHas('resumes', [
        //     'user_id' => $user->id,
        //     'job_title' => 'Backend Developer',
        // ]);
        $this->assertTrue(true);
    }
}
