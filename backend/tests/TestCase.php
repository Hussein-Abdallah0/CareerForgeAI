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

        // Disable SQLite foreign key constraints during migration
        if (config('database.default') === 'sqlite') {
            \DB::statement('PRAGMA foreign_keys=ON;');
        }
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
