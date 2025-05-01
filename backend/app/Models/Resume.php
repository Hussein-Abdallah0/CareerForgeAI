<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    /** @use HasFactory<\Database\Factories\ResumeFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_title',
        'experience',
        'skills',
        'education',
        'summary',

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
