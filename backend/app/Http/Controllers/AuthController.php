<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDataRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(CreateDataRequest $request)
    {
        $token = $this->authService->registerUser($request);
        return $this->successResponse($token, 201);
    }
}
