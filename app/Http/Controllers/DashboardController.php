<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\AIHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the unified dashboard.
     */
    public function index()
    {
        $userId = Auth::id();

        // 1. Fetch Statistics
        $totalFiles = File::where('user_id', $userId)->count();
        $totalAITasks = AIHistory::where('user_id', $userId)->count();

        // 2. Fetch Recent History (Combine and sort last 5 items)
        $recentFiles = File::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'type' => 'document_tool',
                    'title' => $item->tool_type,
                    'file_name' => $item->original_name,
                    'status' => $item->status,
                    'created_at' => $item->created_at,
                ];
            });

        $recentAITasks = AIHistory::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'type' => 'ai_tool',
                    'title' => $item->type, // e.g., 'summary', 'quiz'
                    'file_name' => 'AI Generated Content',
                    'status' => 'completed',
                    'created_at' => $item->created_at,
                ];
            });

        $recentActivity = $recentFiles->concat($recentAITasks)
            ->sortByDesc('created_at')
            ->take(5)
            ->values();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_files' => $totalFiles,
                'total_ai_tasks' => $totalAITasks,
            ],
            'recent_activity' => $recentActivity
        ]);
    }
}
