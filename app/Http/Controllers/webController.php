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
            "products"=>$products,
        ]);
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
        ]);

        User::create([
            'name' => $data['fullName'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return back()->with('successMessage', $data);

    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if (!Auth::attempt($data)) {
            return back()->with("error", "Invalid Credentials");
        }

        $request->session()->regenerate();

        return Inertia::location('/dashboard');

    }


}
