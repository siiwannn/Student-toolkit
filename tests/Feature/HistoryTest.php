<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\File;
use App\Models\AIHistory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HistoryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();
    }

    public function test_history_index_displays_merged_activity()
    {
        $user = User::factory()->create();

        File::factory()->create([
            'user_id' => $user->id,
            'tool_type' => 'pdf_to_word',
            'status' => 'completed'
        ]);

        AIHistory::create([
            'user_id' => $user->id,
            'type' => 'summary',
            'input_text' => 'Sample',
            'output_text' => 'Output'
        ]);

        $response = $this->actingAs($user)->get('/history');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('History/Index')
            ->has('history', 2)
        );
    }

    public function test_user_can_delete_ai_history()
    {
        $user = User::factory()->create();

        $history = AIHistory::create([
            'user_id' => $user->id,
            'type' => 'quiz',
            'input_text' => 'Test',
            'output_text' => 'Result'
        ]);

        $response = $this->actingAs($user)->delete("/history/ai/{$history->id}");
        
        $response->assertRedirect();
        
        // Assert soft deleted
        $this->assertSoftDeleted('a_i_histories', ['id' => $history->id]);
    }
}
