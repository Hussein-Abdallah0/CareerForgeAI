<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        \Artisan::call('migrate:fresh');
    }

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

    public function test_user_can_login()
    {
        //create user with credentials
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        //test login with the above user credentials 
        $response = $this->postJson('/api/v1/login', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['success', 'payload']);
    }

    public function test_user_cannot_login_with_invalid_credentials()
    {
        $response = $this->postJson('/api/v1/login', [
            'email' => 'fail@example.com',
            'password' => 'wrongpass',
        ]);

        $response->assertStatus(401);
        $response->assertJson([
            'success' => false,
            'error' => 'Unauthorized'
        ]);
    }
}
