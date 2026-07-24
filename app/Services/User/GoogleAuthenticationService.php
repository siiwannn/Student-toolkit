<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Illuminate\Support\Facades\Hash;

class GoogleAuthenticationService
{
    /**
     * Handle the Socialite user object and authenticate the user.
     *
     * @param SocialiteUser $googleUser
     * @return void
     */
    public function handleProviderCallback(SocialiteUser $googleUser): void
    {
        $user = User::where('email', $googleUser->getEmail())->first();

        if ($user) {
            // Existing user
            $this->updateExistingUser($user, $googleUser);
        } else {
            // New user
            $user = $this->createNewUser($googleUser);
        }

        Auth::login($user, true);
    }

    /**
     * Update existing user with Google details.
     */
    protected function updateExistingUser(User $user, SocialiteUser $googleUser): void
    {
        // Link Google ID if not already linked, or if they signed up locally first
        if (! $user->google_id) {
            $user->google_id = $googleUser->getId();
        }

        // Always update provider avatar to ensure it is fresh
        $user->provider_avatar = $googleUser->getAvatar();

        $user->save();
    }

    /**
     * Create a new user from Google payload.
     */
    protected function createNewUser(SocialiteUser $googleUser): User
    {
        return User::create([
            'name' => $googleUser->getName() ?? $googleUser->getNickname() ?? 'Google User',
            'email' => $googleUser->getEmail(),
            'password' => Hash::make(Str::random(32)),
            'provider' => 'google',
            'google_id' => $googleUser->getId(),
            'provider_avatar' => $googleUser->getAvatar(),
            'email_verified_at' => now(), // We can safely assume Google verified this email
        ]);
    }
}
