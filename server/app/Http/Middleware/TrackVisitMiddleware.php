<?php

namespace App\Http\Middleware;

use App\Models\Visit;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisitMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
       // Ghi lại truy cập vào database
       if ($request->is('layout')) {
        Visit::create([
            'path' => $request->path(),
            'ip' => $request->ip()
        ]);
    }

    return $next($request);
    }
}
