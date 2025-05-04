<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAnalysisRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'job_title'         => 'required|string|max:150',
            'location'           => 'required|string|max:100',
            'experience_level'   => 'required|string|max:100',
            'current_salary'     => 'nullable|numeric|min:0|max:99999999.99',
            'suggested_range'   => 'required|string|max:100',
        ];
    }

    public function messages(): array
    {
        return [
            'job_title.required'       => 'The job title is required.',
            'location.required'         => 'The location is required.',
            'experience_level.required' => 'The experience level is required.',
            'current_salary.numeric'   => 'The current salary must be a valid number.',
            'suggested_range.required'  => 'The suggested salary range is required.',
        ];
    }
}
