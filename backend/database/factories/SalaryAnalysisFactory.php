<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalaryAnalysis>
 */
class SalaryAnalysisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'job_title' => $this->faker->jobTitle(),
            'location' => $this->faker->city(),
            'experience_level' => $this->faker->randomElement(['Entry', 'Mid', 'Senior']),
            'current_salary' => '$' . $this->faker->numberBetween(20, 30) . 'k',
            'suggested_range' => '$' . $this->faker->numberBetween(50, 200) . 'k - $' . $this->faker->numberBetween(200, 500) . 'k',
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
