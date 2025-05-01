<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InterviewQuestionController;
use App\Http\Controllers\InterviewSessionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    //Authorized Users
    Route::group(["middleware" => "auth:api"], function () {
        //Interview session Api
        Route::post('interview', [InterviewSessionController::class, 'createSession']);
        Route::patch('interview/{session_id}/finish', [InterviewSessionController::class, 'finishSession']);
        Route::get('interview/{session_id}', [InterviewSessionController::class, 'viewSessionDetails']);


        //Interview question Api
        Route::post('interview/{session_id}/question', [InterviewQuestionController::class, 'addQuestion']);
        Route::patch('question/{question_id}/answer', [InterviewQuestionController::class, 'answerQuestion']);


        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });

    //Unauthenticated Users
    Route::post('/login', [AuthController::class, "login"]);
    Route::post('/register', [AuthController::class, "register"]);
});
