<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Wishlist;
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


        $carts = Cart::where('user_id', $user->id)->with('product')->get();
        $total = $carts->sum(fn($item) => $item->price * $item->quantity);


        $orders = Order::where('user_id', $user->id)
            ->with('items.product')
            ->latest()
            ->take(5)
            ->get();

        $wishlist = Wishlist::where('user_id', $user->id)
            ->with('product')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('UserDashboard', [
            'carts' => $carts,
            'total' => number_format($total, 2),
            'orders' => $orders,
            'wishlist' => $wishlist,
        ]);
    }


    public function dashboard()
    {
        $totalProducts = Product::count();
        $totalUsers = User::count();

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
