<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\File;
use App\Models\AIHistory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();
    }

    public function test_dashboard_displays_correct_statistics_and_recent_activity()
    {
        $user = User::factory()->create();

        // Create 2 Document tools history
        File::factory()->count(2)->create([
            'user_id' => $user->id,
            'tool_type' => 'pdf_to_word',
            'status' => 'completed'
        ]);

        // Create 3 AI history
        for ($i = 0; $i < 3; $i++) {
            AIHistory::create([
                'user_id' => $user->id,
                'type' => 'summary',
                'input_text' => 'Sample text',
                'output_text' => 'Sample summary'
            ]);
        }

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        
        // Assert view has stats array
        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard')
            ->has('stats.total_files')
            ->where('stats.total_files', 2)
            ->has('stats.total_ai_tasks')
            ->where('stats.total_ai_tasks', 3)
            ->has('recent_activity', 5)
        );
    }
}
