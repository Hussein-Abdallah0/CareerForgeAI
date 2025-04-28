<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    //Authorized Users
    Route::group(["middleware" => "auth:api"], function () {

        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });

    //Unauthenticated Users
    Route::post('/login', [AuthController::class, "login"]);
    Route::post('/register', [AuthController::class, "register"]);
});
