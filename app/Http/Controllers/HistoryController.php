<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\AIHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    /**
     * Display the user's document history.
     */
    public function index()
    {
        $userId = Auth::id();

        // Get document files
        $files = File::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'type' => 'document_tool',
                    'title' => $item->tool_type,
                    'file_name' => $item->original_name,
                    'status' => $item->status,
                    'download_url' => route('document.download', $item->id),
                    'created_at' => $item->created_at,
                ];
            });

        // Get AI histories
        $aiHistories = AIHistory::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'type' => 'ai_tool',
                    'title' => $item->type,
                    'file_name' => 'AI Generated Content',
                    'status' => 'completed',
                    'content' => $item->output_text, // Used for displaying directly
                    'created_at' => $item->created_at,
                ];
            });

        // Merge, sort, and paginate manually
        $history = $files->concat($aiHistories)
            ->sortByDesc('created_at')
            ->values();

        return Inertia::render('History/Index', [
            'history' => $history
        ]);
    }

    /**
     * Delete a file history item.
     */
    public function destroy(File $file)
    {
        if ($file->user_id !== Auth::id()) {
            abort(403);
        }

        $file->delete();

        return back()->with('success', 'History item deleted.');
    }

    /**
     * Delete an AI history item.
     */
    public function destroyAI(AIHistory $aiHistory)
    {
        if ($aiHistory->user_id !== Auth::id()) {
            abort(403);
        }

        $aiHistory->delete();

        return back()->with('success', 'AI History item deleted.');
    }
}
