<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterviewSession extends Model
{
    /** @use HasFactory<\Database\Factories\InterviewSessionFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_title',
        'ai_feedback',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(InterviewQuestion::class);
    }
}
