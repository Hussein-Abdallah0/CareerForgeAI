<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resume>
 */
class ResumeFactory extends Factory
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
            'experience' => [
                [
                    'company' => $this->faker->company(),
                    'position' => $this->faker->jobTitle(),
                    'duration' => $this->faker->dateTimeBetween('-5 years', 'now')->format('Y-m-d') . ' to present',
                    'responsibilities' => $this->faker->sentences(4)
                ],
                [
                    'company' => $this->faker->company(),
                    'position' => $this->faker->jobTitle(),
                    'duration' => $this->faker->dateTimeBetween('-8 years', '-5 years')->format('Y-m-d') . ' to ' . $this->faker->dateTimeBetween('-5 years', '-3 years')->format('Y-m-d'),
                    'responsibilities' => $this->faker->sentences(4)
                ]
            ],
            'education' => [
                [
                    'degree' => $this->faker->randomElement(['BSc', 'MSc', 'PhD']) . ' in ' . $this->faker->randomElement(['Computer Science', 'Software Engineering', 'Information Technology']),
                    'institution' => $this->faker->company(),
                    'year' => $this->faker->year()
                ]
            ],
            'summary' => $this->faker->paragraph(),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
