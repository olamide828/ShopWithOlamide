<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Container\Attributes\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
   public function handle(Request $request, Closure $next)
{
    if (!Auth::check()) {
        return redirect('/login');
    }

    if (Auth::user()->isAdmin()) {
        return $next($request);
    }

    \Log::warning('Unauthorized admin access attempt by user: ' . Auth::id());

    return redirect('/')->with('error', 'Access Denied.');
}
}
