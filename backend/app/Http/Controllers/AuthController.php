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
        try {
            $token = $this->authService->registerUser($request);
            return $this->successResponse($token, 201);
        } catch (\Exception $e) {
            return $this->errorResponse("Failed to register: " . $e->getMessage(), 500);
        }
    }

    public function login(CreateDataRequest $request)
    {
        $token = $this->authService->attemptLogin($request);

        if (!$token) {
            return $this->errorResponse("Unauthorized", 401);
        }

        return $this->successResponse($token, 200);
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
