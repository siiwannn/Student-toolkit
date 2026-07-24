<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\User\AuthenticationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function __construct(
        private AuthenticationService $authService
    ) {}

    public function createRegister(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function storeRegister(RegisterRequest $request): RedirectResponse
    {
        $this->authService->register($request->validated());

        return redirect(route('dashboard', absolute: false));
    }

    public function createLogin(): Response
    {
        return Inertia::render('Auth/Login', [
            'status' => session('status'),
        ]);
    }

    public function storeLogin(LoginRequest $request): RedirectResponse
    {
        $request->ensureIsNotRateLimited(); // Handles rate limiting checks

        $this->authService->login($request->only('email', 'password'), $request->boolean('remember'));

        \Illuminate\Support\Facades\RateLimiter::clear($request->throttleKey());

        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function destroyLogout(): RedirectResponse
    {
        $this->authService->logout();

        return redirect('/');
    }

    public function createForgotPassword(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    public function storeForgotPassword(Request $request): RedirectResponse
    {
        $request->validate(['email' => 'required|email']);
        $status = $this->authService->sendPasswordResetLink($request->only('email'));

        if ($status == \Illuminate\Support\Facades\Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }

        throw \Illuminate\Validation\ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }

    public function createResetPassword(Request $request): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }

    public function storeResetPassword(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()],
        ]);

        $status = $this->authService->resetPassword($request->only('email', 'password', 'password_confirmation', 'token'));

        if ($status == \Illuminate\Support\Facades\Password::PASSWORD_RESET) {
            return redirect()->route('login')->with('status', __($status));
        }

        throw \Illuminate\Validation\ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }

    public function verifyEmailNotice(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('dashboard', absolute: false))
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }

    public function verifyEmail(\Illuminate\Foundation\Auth\EmailVerificationRequest $request): RedirectResponse
    {
        $this->authService->verifyEmail($request->user());

        return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
    }

    public function sendVerificationEmail(Request $request): RedirectResponse
    {
        $this->authService->sendVerificationEmail($request->user());
        return back()->with('status', 'verification-link-sent');
    }

    public function confirmPassword(): Response
    {
        return Inertia::render('Auth/ConfirmPassword');
    }

    public function storeConfirmPassword(Request $request): RedirectResponse
    {
        if (! \Illuminate\Support\Facades\Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }

        $request->session()->put('auth.password_confirmed_at', time());

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
