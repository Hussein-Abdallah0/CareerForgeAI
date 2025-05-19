<?php

namespace Database\Factories;

use App\Models\InterviewSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InterviewQuestion>
 */
class InterviewQuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'session_id' => InterviewSession::factory(),
            'question' => $this->faker->sentence(),
            'user_answer' => $this->faker->paragraph(),
        ];
    }
}
