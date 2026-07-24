<?php

namespace App\Http\Controllers;

use App\Services\User\GoogleAuthenticationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Illuminate\Http\RedirectResponse
     */
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google and authenticate them.
     *
     * @param GoogleAuthenticationService $service
     * @param Request $request
     * @return RedirectResponse
     */
    public function callback(GoogleAuthenticationService $service, Request $request): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return redirect()->route('login')->with('status', 'Google authentication failed. Please try again.');
        }

        $service->handleProviderCallback($googleUser);

        $request->session()->regenerate();

        // Redirect to dashboard as specified in requirements
        return redirect()->intended(route('dashboard', absolute: false));
    }
}
