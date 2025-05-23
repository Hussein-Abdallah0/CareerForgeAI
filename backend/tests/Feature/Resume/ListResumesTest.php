<?php

namespace Tests\Feature\Resume;

use App\Models\Resume;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ListResumesTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_list_their_resumes()
    {
        //create user and resumes for this user
        $user = User::factory()->create();
        Resume::factory()->count(2)->create(['user_id' => $user->id]);

        //get resumes
        $response = $this->jwtAuth($user)->getJson('/api/v1/resume');

        $response->assertStatus(200)
            ->assertJsonCount(2);
    }
}
