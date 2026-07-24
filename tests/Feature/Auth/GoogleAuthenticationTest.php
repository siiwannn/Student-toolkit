<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class GoogleAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_redirect_to_google()
    {
        $response = $this->get('/auth/google/redirect');
        
        // Assert it redirects to Google (usually a 302 to accounts.google.com)
        $response->assertStatus(302);
        $this->assertStringContainsString('accounts.google.com', $response->getTargetUrl());
    }

    public function test_new_user_can_register_via_google()
    {
        $abstractUser = Mockery::mock(SocialiteUser::class);
        $abstractUser->shouldReceive('getId')->andReturn('google-12345')
            ->shouldReceive('getName')->andReturn('Test Google User')
            ->shouldReceive('getNickname')->andReturn(null)
            ->shouldReceive('getEmail')->andReturn('googleuser@example.com')
            ->shouldReceive('getAvatar')->andReturn('https://google.com/avatar.jpg');

        $provider = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $provider->shouldReceive('user')->andReturn($abstractUser);
        
        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get('/auth/google/callback');

        $this->assertAuthenticated();
        
        // We assert it redirects to dashboard since that's what the requirement said
        $response->assertRedirect(route('dashboard', absolute: false));

        $this->assertDatabaseHas('users', [
            'email' => 'googleuser@example.com',
            'google_id' => 'google-12345',
            'provider' => 'google',
            'provider_avatar' => 'https://google.com/avatar.jpg',
        ]);
    }

    public function test_existing_user_can_login_via_google_and_link_account()
    {
        $user = User::factory()->create([
            'email' => 'existing@example.com',
            'google_id' => null,
            'provider_avatar' => null,
            'provider' => 'local',
        ]);

        $abstractUser = Mockery::mock(SocialiteUser::class);
        $abstractUser->shouldReceive('getId')->andReturn('google-67890')
            ->shouldReceive('getName')->andReturn('Existing User')
            ->shouldReceive('getNickname')->andReturn(null)
            ->shouldReceive('getEmail')->andReturn('existing@example.com')
            ->shouldReceive('getAvatar')->andReturn('https://google.com/newavatar.jpg');

        $provider = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $provider->shouldReceive('user')->andReturn($abstractUser);
        
        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get('/auth/google/callback');

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', absolute: false));

        // Assert google_id was linked and provider_avatar was updated
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'google_id' => 'google-67890',
            'provider_avatar' => 'https://google.com/newavatar.jpg',
            'provider' => 'local', // Provider stays local because they registered locally originally
        ]);
    }
}
