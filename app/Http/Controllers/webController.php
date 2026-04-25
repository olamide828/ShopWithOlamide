<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class webController extends Controller
{
    public function index()
    {
        $products = Product::take(10)->get();
        return Inertia::render('Home/HomePage', [
            "products" => $products,
        ]);
    }

    public function about()
    {
        return Inertia::render('About');
    }

    public function login()
    {
        return Inertia::render('login');
    }

    public function register()
    {
        return Inertia::render('register');
    }

    public function forgottenPassword()
    {
        return Inertia::render('Auth/forgottenPassword');
    }

    public function updatePassword()
    {
        return Inertia::render('Auth/updatePassword');
    }

    public function verifyEmail()
    {
        return Inertia::render('verifyEmail');
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'dateOfBirth' => 'required|string',
            'role' => 'nullable|string',
        ]);

        User::create([
            'name' => $data['fullName'],
            'email' => $data['email'],
            'dateOfBirth' => $data['dateOfBirth'],
            'password' => Hash::make($data['password']),
            'role' => $request->role ?? 'user',
        ]);

        return redirect('/verify-email')->with('success', 'Account created! Please log in.');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        $loginRole = $request->input('role', 'user');

        if (!Auth::attempt($credentials)) {
            return back()->withErrors(['email' => 'Invalid credentials']);
        }

        $request->session()->regenerate();

        $user = Auth::user();

        if ($user->is_banned) {
            Auth::logout();
            return back()->withErrors(['email' => 'Your account has been suspended.']);
        }

        if ($loginRole === 'admin' && !$user->isAdmin()) {
            Auth::logout();
            return back()->withErrors(['email' => 'Invalid credentials']);
        }

        if ($loginRole === 'user' && $user->isAdmin()) {
            Auth::logout();
            return back()->withErrors(['email' => 'Invalid credentials']);
        }

        // Capture device info on every successful login
        $deviceInfo = $this->parseUserAgent($request->userAgent() ?? '');

        $user->update([
            'last_ip' => $request->ip(),
            'last_device' => $deviceInfo['device'],
            'last_browser' => $deviceInfo['browser'],
            'last_os' => $deviceInfo['os'],
            'last_seen_at' => now(),
        ]);

        if ($user->isAdmin()) {
            return redirect('/admin');
        }

        return redirect('/dashboard');
    }

    public function contact()
    {
        return Inertia::render('ContactPage');
    }

    public function terms()
    {
        return Inertia::render('Terms');
    }

    public function privacyPolicy()
    {
        return Inertia::render('PrivacyPolicy');
    }

    public function manageAccount()
    {
        return Inertia::render('ManageAccountForm');
    }

    private function parseUserAgent(string $ua): array
    {
        // Detect OS
        $os = 'Unknown OS';
        $osPatterns = [
            'Windows 11' => 'Windows NT 10.0.*Win64',
            'Windows 10' => 'Windows NT 10.0',
            'Windows 8.1' => 'Windows NT 6.3',
            'Windows 8' => 'Windows NT 6.2',
            'Windows 7' => 'Windows NT 6.1',
            'Android' => 'Android',
            'iPhone (iOS)' => 'iPhone',
            'iPad (iOS)' => 'iPad',
            'Mac OS X' => 'Mac OS X',
            'Linux' => 'Linux',
            'Chrome OS' => 'CrOS',
        ];
        foreach ($osPatterns as $name => $pattern) {
            if (preg_match('/' . $pattern . '/i', $ua)) {
                $os = $name;
                break;
            }
        }

        // Detect Browser
        $browser = 'Unknown Browser';
        $browserPatterns = [
            'Edge' => 'Edg\/',
            'Opera' => 'OPR\/',
            'Samsung' => 'SamsungBrowser',
            'Chrome' => 'Chrome\/',
            'Firefox' => 'Firefox\/',
            'Safari' => 'Safari\/',
            'IE' => 'Trident\/',
        ];
        foreach ($browserPatterns as $name => $pattern) {
            if (preg_match('/' . $pattern . '/i', $ua)) {
                $browser = $name;
                break;
            }
        }

        // Detect Device type
        $device = 'Desktop';
        if (preg_match('/iPhone|Android.*Mobile|Windows Phone/i', $ua)) {
            $device = 'Mobile';
        } elseif (preg_match('/iPad|Android(?!.*Mobile)|Tablet/i', $ua)) {
            $device = 'Tablet';
        }

        return compact('os', 'browser', 'device');
    }
}