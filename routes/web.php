<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\AIController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

use App\Http\Controllers\DashboardController;

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Document Tools Routes
Route::prefix('tools')->group(function () {
    Route::get('/', [DocumentController::class, 'index'])->name('document.tools');
    Route::get('/{tool}', [DocumentController::class, 'showTool'])->name('document.tool.show');
    Route::post('/{tool}/process', [DocumentController::class, 'process'])->name('document.tool.process');
    Route::get('/download/{file}', [DocumentController::class, 'download'])->name('document.download');
});

// AI Study Routes
Route::prefix('ai')->group(function () {
    Route::get('/', [AIController::class, 'index'])->name('ai.index');
    Route::get('/summary', [AIController::class, 'summaryPage'])->name('ai.summary');
    Route::post('/summary', [AIController::class, 'processSummary'])->name('ai.summary.process');
    Route::get('/quiz', [AIController::class, 'quizPage'])->name('ai.quiz');
    Route::post('/quiz', [AIController::class, 'processQuiz'])->name('ai.quiz.process');
    Route::get('/audio-to-text', [AIController::class, 'audioToTextPage'])->name('ai.audio');
    Route::post('/audio-to-text', [AIController::class, 'processAudioToText'])->name('ai.audio.process');
});

Route::middleware('auth')->group(function () {
    // History
    Route::get('/history', [HistoryController::class, 'index'])->name('history.index');
    Route::delete('/history/{file}', [HistoryController::class, 'destroy'])->name('history.destroy');
    Route::delete('/history/ai/{aiHistory}', [HistoryController::class, 'destroyAI'])->name('history.destroy.ai');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/password', [ProfileController::class, 'updatePassword'])->name('password.update');
    Route::delete('/profile/avatar', [ProfileController::class, 'destroyAvatar'])->name('profile.avatar.destroy');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
