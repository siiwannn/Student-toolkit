<?php

namespace App\Http\Controllers;

use App\Services\AI\AIService;
use App\Services\AI\TranscriptionService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File as FileRule;
use Inertia\Inertia;

class AIController extends Controller
{
    public function __construct(
        private AIService $aiService,
        private TranscriptionService $transcriptionService
    ) {}

    /**
     * Display AI Study Dashboard
     */
    public function index()
    {
        return Inertia::render('AIStudy/Index');
    }

    /**
     * Display Summary Page
     */
    public function summaryPage()
    {
        return Inertia::render('AIStudy/Summary');
    }

    /**
     * Process Summary
     */
    public function processSummary(Request $request)
    {
        $request->validate([
            'text' => 'required|string|min:50|max:10000',
        ]);

        try {
            $history = $this->aiService->generateSummary($request->input('text'));
            return response()->json([
                'success' => true,
                'summary' => $history->output_text
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to generate summary.'], 500);
        }
    }

    /**
     * Display Quiz Page
     */
    public function quizPage()
    {
        return Inertia::render('AIStudy/Quiz');
    }

    /**
     * Process Quiz
     */
    public function processQuiz(Request $request)
    {
        $request->validate([
            'text' => 'required|string|min:50|max:10000',
            'question_count' => 'required|integer|min:1|max:20',
        ]);

        try {
            $result = $this->aiService->generateQuiz($request->input('text'), $request->input('question_count'));
            return response()->json([
                'success' => true,
                'questions' => $result['questions']
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to generate quiz.'], 500);
        }
    }

    /**
     * Display Audio to Text Page
     */
    public function audioToTextPage()
    {
        return Inertia::render('AIStudy/AudioToText');
    }

    /**
     * Process Audio Transcription
     */
    public function processAudioToText(Request $request)
    {
        $request->validate([
            'audio' => ['required', FileRule::types(['mp3', 'wav', 'm4a', 'mpeg', 'ogg'])->max(25 * 1024)],
        ]);

        try {
            $transcription = $this->transcriptionService->transcribe($request->file('audio'));
            return response()->json([
                'success' => true,
                'transcript' => $transcription->transcript
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to transcribe audio. ' . $e->getMessage()], 500);
        }
    }
}
