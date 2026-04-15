<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SellerMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect('/login');
        }

        if (Auth::user()->isSeller()) {
            return $next($request);
        }

        Log::warning('Unauthorized seller access attempt by user: ' . Auth::id());

        return redirect('/')->with('error', 'Access Denied.');
    }
}