<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
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


    public function dashboard()
    {
        $totalProducts = Product::count();
        $totalUsers = User::count();

        $totalSales = OrderItem::selectRaw('SUM(price * quantity) as total')->value('total');

        $monthlySales = OrderItem::whereMonth('created_at', now()->month)
            ->sum(\DB::raw('price * quantity'));

        $recentUsers = User::latest()->take(2)->get()->map(function ($user) {
            $role = $user->role === 'admin' ? 'Admin' : 'User';
            return [
                'message' => "{$role} '{$user->name}' joined the platform.",
                'time' => $user->created_at,
                'type' => 'user'
            ];
        });

        $recentProducts = Product::with('user:id,name')->latest()->take(2)->get()->map(function ($product) {
            return [
                'message' => "Admin '{$product->user?->name}' listed '{$product->name}'.",
                'time' => $product->created_at,
                'type' => 'product'
            ];
        });

        $recentOrders = Order::with('user:id,name')->latest()->take(2)->get()->map(function ($order) {
            return [
                'message' => "New order #{$order->id} from {$order->user?->name}",
                'time' => $order->created_at,
                'type' => 'order'
            ];
        });

        $activities = $recentUsers
            ->concat($recentProducts)
            ->concat($recentOrders)
            ->sortByDesc('time')
            ->take(5)
            ->map(fn($a) => [
                'message' => $a['message'],
                'time' => $a['time']->diffForHumans(),
                'type' => $a['type']
            ])
            ->values();

        return inertia('DashboardHome', [
            'stats' => [
                'products' => $totalProducts,
                'users' => $totalUsers,
                'sales' => $totalSales,
                'monthlySales' => $monthlySales

            ],
            'activities' => $activities
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
