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
use Illuminate\Support\Facades\Storage;
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

    /**
     * User dashboard — recovered from frontend props.
     *
     * The UserDashboard component expects:
     *   - carts       : Cart items with product (image resolved to full URL)
     *   - cartTotal   : Sum of price * quantity across all cart items
     *   - total       : Total amount spent across all completed orders
     *   - orders      : All user orders (id, status, total, created_at, updated_at)
     *   - activeOrders: Count of orders that are not delivered or cancelled
     *   - wishlist    : Wishlist items with product (image resolved to full URL)
     */
    public function userDashboard()
    {
        $userId = Auth::id();

        // --- CART ---
        $carts = Cart::with('product')
            ->where('user_id', $userId)
            ->get();

        // Resolve product image URLs exactly like CartController does
        $carts->transform(function ($cart) {
            if ($cart->product && $cart->product->image) {
                if (!filter_var($cart->product->image, FILTER_VALIDATE_URL)) {
                    $cart->product->image = Storage::disk('private')->url($cart->product->image);
                }
            } elseif ($cart->product) {
                $cart->product->image = 'https://placehold.co/600x400';
            }
            return $cart;
        });

        // Cart subtotal shown in the "Cart Summary" widget
        $cartTotal = $carts->sum(fn($item) => $item->price * $item->quantity);

        // --- ORDERS ---
        $orders = Order::where('user_id', $userId)
            ->latest()
            ->get();

        // Total spent — summed from order_items directly so the figure
        // persists even if a product or user is later deleted.
        // orders.total would go to 0 if the order row is wiped,
        // but order_items.price * quantity survives as a financial snapshot.
        $total = OrderItem::whereHas('order', fn($q) => $q->where('user_id', $userId))
            ->selectRaw('SUM(price * quantity) as total')
            ->value('total') ?? 0;

        // Active orders = pending or shipped (excludes delivered & cancelled)
        // Matches the "Active Orders" stat card with FaTruck icon
        $activeOrders = $orders
            ->whereIn('status', ['pending', 'shipped', 'paid'])
            ->count();

        // --- WISHLIST ---
        $wishlist = Wishlist::with('product')
            ->where('user_id', $userId)
            ->get();

        // Resolve wishlist product image URLs exactly like WishlistController does
        foreach ($wishlist as $item) {
            if ($item->product) {
                $rawPath = $item->product->image;

                if (empty($rawPath)) {
                    $item->product->image = 'https://placehold.co/600x400';
                } elseif (filter_var($rawPath, FILTER_VALIDATE_URL)) {
                    $item->product->image = $rawPath;
                } else {
                    $item->product->image = Storage::disk('private')->url($rawPath);
                }
            }
        }

        return Inertia::render('UserDashboard', [
            'carts' => $carts,
            'cartTotal' => $cartTotal,
            'total' => $total,
            'orders' => $orders,
            'activeOrders' => $activeOrders,
            'wishlist' => $wishlist,
        ]);
    }

    /**
     * Admin dashboard.
     */
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
                'type' => 'user',
            ];
        });

        $recentProducts = Product::with('user:id,name')->latest()->take(2)->get()->map(function ($product) {
            return [
                'message' => "Admin '{$product->user?->name}' listed '{$product->name}'.",
                'time' => $product->created_at,
                'type' => 'product',
            ];
        });

        $recentOrders = Order::with('user:id,name')->latest()->take(2)->get()->map(function ($order) {
            return [
                'message' => "New order #{$order->id} from {$order->user?->name}",
                'time' => $order->created_at,
                'type' => 'order',
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
                'type' => $a['type'],
            ])
            ->values();

        return inertia('DashboardHome', [
            'stats' => [
                'products' => $totalProducts,
                'users' => $totalUsers,
                'sales' => $totalSales,
                'monthlySales' => $monthlySales,
            ],
            'activities' => $activities,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}