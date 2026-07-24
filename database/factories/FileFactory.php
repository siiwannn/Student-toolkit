<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\File>
 */
class FileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => null,
            'tool_type' => 'pdf_to_word',
            'original_name' => $this->faker->word() . '.pdf',
            'stored_name' => $this->faker->uuid() . '.pdf',
            'mime_type' => 'application/pdf',
            'extension' => 'pdf',
            'size' => $this->faker->numberBetween(1000, 5000000),
            'storage_path' => 'uploads/pdf_to_word/' . $this->faker->uuid() . '.pdf',
            'status' => 'uploaded',
        ];
    }
}
