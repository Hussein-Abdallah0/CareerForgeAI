<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    /** @use HasFactory<\Database\Factories\ResumeFactory> */
    use HasFactory;

    protected $fillable = [
        'summary',
        'user_id',
        'job_title',
        'experience',
        'education',

    ];

    protected $casts = [
        'experience' => 'array',
        'education' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
