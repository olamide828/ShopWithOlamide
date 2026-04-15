<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\User;

class SellerController extends Controller
{
    public function sellerLogin()
    {
        return Inertia::render("Seller/SellerLoginPage");
    }

    public function sellerRegister()
    {
        return Inertia::render("Seller/SellerRegisterPage");
    }

    // DASHBOARD
    public function show()
{
    $user = Auth::user();

    // PRODUCTS OWNED BY SELLER
    $productsCount = Product::where('user_id', $user->id)->count();

    // TOTAL ITEMS SOLD BY SELLER
    $totalSold = OrderItem::where('seller_id', $user->id)
        ->sum('quantity');

    // REVENUE (REAL)
    $revenue = OrderItem::where('seller_id', $user->id)
        ->sum(\DB::raw('price * quantity'));

    // ORDERS (unique orders involving seller)
    $ordersCount = OrderItem::where('seller_id', $user->id)
        ->distinct('order_id')
        ->count('order_id');

    // RECENT ACTIVITY
    $activities = OrderItem::with('product')
        ->where('seller_id', $user->id)
        ->latest()
        ->take(5)
        ->get()
        ->map(function ($item) {
            return [
                'text' => "Sold {$item->quantity}x {$item->product->name}",
                'time' => $item->created_at->diffForHumans(),
            ];
        });

        return Inertia::render("Seller/SellerDashboardPage", [
        'stats' => [
            'products' => $productsCount,
            'orders' => $ordersCount,
            'revenue' => $revenue,
            'sold' => $totalSold,
        ],
        'activities' => $activities,
    ]);
}

    // REGISTER SELLER
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'seller', // 🔥 KEY PART
        ]);

        Auth::login($user);

        return redirect('/verify-email')->with('success', 'Welcome seller!');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if ($user->role !== 'seller') {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'You are not a seller account.',
                ]);
            }

            return redirect('/seller');
        }

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }
}