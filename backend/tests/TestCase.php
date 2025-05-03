<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Auth;

abstract class TestCase extends BaseTestCase
{
    protected function jwtAuth($user, $guard = 'api')
    {
        $token = auth($guard)->attempt([
            'email' => $user->email,
            'password' => 'password' // Must match factory password
        ]);

        $this->withHeader('Authorization', 'Bearer ' . $token);

        return $this;
    }
}
