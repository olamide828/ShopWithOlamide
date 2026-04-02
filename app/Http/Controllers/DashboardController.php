<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Home/Dashboard');
    }


    // app/Http/Controllers/DashboardController.php

    public function userDashboard()
    {
        $user = Auth::user();

        // Get cart items and total for the dashboard preview
        $carts = Cart::where('user_id', $user->id)->with('product')->get();
        $total = $carts->sum(fn($item) => $item->price * $item->quantity);

        // Placeholder for orders (If you have an Order model)
        $orders = []; // $orders = Order::where('user_id', $user->id)->latest()->take(5)->get();

        return Inertia::render('UserDashboard', [
            'carts' => $carts,
            'total' => number_format($total, 2),
            'orders' => $orders
        ]);
    }


    public function dashboard()
    {
        $totalProducts = Product::count();
        $totalUsers = User::count();

        // Example sales (adjust if you have orders table)
        $totalSales = 8450;

        return inertia('DashboardHome', [
            'stats' => [
                'products' => $totalProducts,
                'users' => $totalUsers,
                'sales' => $totalSales,
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
