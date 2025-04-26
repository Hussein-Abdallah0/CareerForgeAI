<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    public function test_user_can_register()
    {
        $response = $this->postJson('/api/v1/register', [
            'first_name' => 'test',
            'last_name' => 'user',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['success', 'payload']);
    }
}
