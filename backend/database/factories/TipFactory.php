<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tip>
 */
class TipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tip_text' => $this->faker->paragraph(3),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => now()
        ];
    }
}
