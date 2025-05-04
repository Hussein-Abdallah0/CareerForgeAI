<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InterviewQuestionController;
use App\Http\Controllers\InterviewSessionController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\SkillController;
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

        //Resume api
        Route::post('resume', [ResumeController::class, 'createResume']);
        Route::get('resume', [ResumeController::class, 'listResumes']);
        Route::get('resume/{resume_id}', [ResumeController::class, 'viewResume']);
        Route::delete('resume/{resume_id}', [ResumeController::class, 'deleteResume']);

        //Skill api
        Route::get('skill/available', [SkillController::class, 'listAvailableSkills']);
        Route::get('skill', [SkillController::class, 'listUserSkills']);
        Route::post('skill', [SkillController::class, 'addUserSkill']);
        Route::delete('skill/{skill_id}', [SkillController::class, 'removeUserSkill']);


        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });

    //Unauthenticated Users
    Route::post('/login', [AuthController::class, "login"]);
    Route::post('/register', [AuthController::class, "register"]);
});
