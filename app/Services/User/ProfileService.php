<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\UploadedFile;

class ProfileService
{
    /**
     * Update the user's profile information.
     */
    public function updateProfile(User $user, array $data, ?UploadedFile $avatar = null): void
    {
        $user->fill([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($avatar) {
            // Delete old avatar if exists
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            
            // Store new avatar
            $path = $avatar->store('avatars', 'public');
            $user->avatar = $path;
        }

        $user->save();
    }

    /**
     * Remove the user's custom avatar.
     */
    public function removeAvatar(User $user): void
    {
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
            $user->avatar = null;
            $user->save();
        }
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(User $user, string $newPassword): void
    {
        $user->update([
            'password' => Hash::make($newPassword),
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function deleteAccount(User $user): void
    {
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        Auth::logout();
        
        $user->delete();

        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }
}
