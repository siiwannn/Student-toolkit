<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('google.redirect');
    Route::get('auth/google/callback', [GoogleAuthController::class, 'callback'])->name('google.callback');

    Route::get('register', [AuthController::class, 'createRegister'])->name('register');
    Route::post('register', [AuthController::class, 'storeRegister']);

    Route::get('login', [AuthController::class, 'createLogin'])->name('login');
    Route::post('login', [AuthController::class, 'storeLogin']);

    Route::get('forgot-password', [AuthController::class, 'createForgotPassword'])->name('password.request');
    Route::post('forgot-password', [AuthController::class, 'storeForgotPassword'])->name('password.email');

    Route::get('reset-password/{token}', [AuthController::class, 'createResetPassword'])->name('password.reset');
    Route::post('reset-password', [AuthController::class, 'storeResetPassword'])->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', [AuthController::class, 'verifyEmailNotice'])->name('verification.notice');
    Route::get('verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
    Route::post('email/verification-notification', [AuthController::class, 'sendVerificationEmail'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [AuthController::class, 'confirmPassword'])->name('password.confirm');
    Route::post('confirm-password', [AuthController::class, 'storeConfirmPassword']);

    Route::post('logout', [AuthController::class, 'destroyLogout'])->name('logout');
});
