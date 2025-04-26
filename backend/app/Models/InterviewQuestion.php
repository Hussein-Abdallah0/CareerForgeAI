<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterviewQuestion extends Model
{
    /** @use HasFactory<\Database\Factories\InterviewQuestionFactory> */
    use HasFactory;

    protected $fillable = [
        'session_id',
        'question',
        'user_answer',
        'ai_comment',
    ];

    public function session()
    {
        return $this->belongsTo(InterviewSession::class, 'session_id');
    }
}
