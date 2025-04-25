<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalaryAnalysis extends Model
{
    /** @use HasFactory<\Database\Factories\SalaryAnalysisFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_title',
        'location',
        'experience_level',
        'suggested_range',
        'market_analysis',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
