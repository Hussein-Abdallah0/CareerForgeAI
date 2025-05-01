<?php

namespace Tests\Feature\Resume;

use App\Models\Resume;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteResumeTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_delete_resume()
    {
        //create user and resume
        $user = User::factory()->create();
        $resume = Resume::factory()->create(['user_id' => $user->id]);

        //delete resume
        $response = $this->actingAs($user)->deleteJson("/api/v1/resume/{$resume->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('resumes', [
            'id' => $resume->id,
        ]);
    }
}
