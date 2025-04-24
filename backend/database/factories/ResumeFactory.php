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
            'experience' => $this->faker->paragraphs(3, true),
            'skills' => implode(', ', $this->faker->words(5)),
            'education' => $this->faker->sentence(),
            'tailored_resume' => $this->faker->paragraphs(5, true),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
