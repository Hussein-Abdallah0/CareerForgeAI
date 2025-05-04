<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalaryAnalysis extends Model
{
    /** @use HasFactory<\Database\Factories\SalaryAnalysisFactory> */
    use HasFactory;

    protected $table = 'salary_analysis';

    protected $fillable = [
        'user_id',
        'job_title',
        'location',
        'experience_level',
        'current_salary',
        'suggested_range',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
