<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */

   
    public function boot(\Illuminate\Routing\UrlGenerator $url)
    {
        // 1. Force HTTPS in production (Render requires this)
        if (config('app.env') === 'production') {
            $url->forceScheme('https');
        }

        // 2. Share data with Inertia (React)
        Inertia::share([
            'auth' => fn () => [
                'user' => Auth::user(),
            ],

            'cartCount' => fn () => Auth::check()
                ? Cart::where('user_id', Auth::id())->sum('quantity')
                : 0,
        ]);
    }


    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn(): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
