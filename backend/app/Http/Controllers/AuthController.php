<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDataRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(CreateDataRequest $request)
    {
        $function = fn() => $this->authService->registerUser($request);
        return $this->tryCatchResponse($function, 201, 'Failed to register:');
    }

    public function login(CreateDataRequest $request)
    {
        $function = fn() => $this->authService->attemptLogin($request);
        return $this->tryCatchResponse($function, 200, 'Failed to login:');
    }

    public function me()
    {
        return $this->successResponse(Auth::user(), 200);
    }

    public function logout()
    {
        Auth::logout();
        return $this->successResponse('Successfully logged out', 200);
    }
}
