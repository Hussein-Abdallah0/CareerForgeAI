<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Auth;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        \Artisan::call('migrate:fresh');
        \Artisan::call('jwt:secret');
    }

    protected function jwtAuth($user, $guard = 'api')
    {
        $token = auth($guard)->attempt([
            'email' => $user->email,
            'password' => 'password'
        ]);

        $this->withHeader('Authorization', 'Bearer ' . $token);

        return $this;
    }
}
