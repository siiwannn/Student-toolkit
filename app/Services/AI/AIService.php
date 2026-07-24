<?php

namespace App\Services\AI;

use App\Models\AIHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AIService
{
    /**
     * Generate a summary from text using a mock AI.
     */
    public function generateSummary(string $text): AIHistory
    {
        // Mock processing delay
        sleep(2);

        // Dummy AI Logic for Summary: Take first 3 sentences and add a generic conclusion
        $sentences = explode('.', $text);
        $summarySentences = array_slice(array_filter($sentences), 0, 3);
        
        $output = "Here is a quick summary of your text:\n\n" 
                . implode('. ', $summarySentences) 
                . ".\n\nIn conclusion, this text covers important concepts related to the subject matter.";

        return AIHistory::create([
            'user_id' => Auth::id(),
            'type' => 'summary',
            'input_text' => $text,
            'output_text' => $output,
        ]);
    }

    /**
     * Generate a quiz from text using a mock AI.
     */
    public function generateQuiz(string $text, int $questionCount = 5): array
    {
        // Mock processing delay
        sleep(2);

        $words = array_filter(str_word_count(strtolower($text), 1), function($w) {
            return strlen($w) > 4; // pick words > 4 chars
        });
        
        $keywords = array_values(array_unique($words));
        
        $questions = [];
        for ($i = 0; $i < min($questionCount, max(1, count($keywords))); $i++) {
            $keyword = $keywords[array_rand($keywords)] ?? 'concept';
            $questions[] = [
                'question' => "What is the primary definition or context of '{$keyword}' in the text?",
                'options' => [
                    "It refers to a fundamental principle.",
                    "It is an example mentioned in the text.",
                    "It contradicts the main topic.",
                    "It is the opposite of the author's view."
                ],
                'correct_answer' => 0 // Mock correct answer index
            ];
        }

        $history = AIHistory::create([
            'user_id' => Auth::id(),
            'type' => 'quiz',
            'input_text' => $text,
            'output_text' => json_encode($questions),
        ]);

        return [
            'history' => $history,
            'questions' => $questions
        ];
    }
}
