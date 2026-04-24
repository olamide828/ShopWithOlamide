<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function checkout()
    {
        $cartItems = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Your cart is empty');
        }

        $total = $cartItems->sum(function ($item) {
            return $item->price * $item->quantity;
        });

        $order = Order::create([
            'user_id' => Auth::id(),
            'total' => $total,
            'status' => 'pending',
        ]);

        foreach ($cartItems as $item) {
            $order->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->price,
            ]);
        }

        Cart::where('user_id', Auth::id())->delete();

        return redirect('/orders')->with('success', 'Order placed successfully');
    }

    public function index()
    {
        $orders = Order::with('items.product')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        // Loop through each order
        $orders->transform(function ($order) {
            // Loop through each item in that order
            $order->items->transform(function ($item) {
                if ($item->product && $item->product->image) {
                    // Generate the cloud URL for the product image
                    $item->product->image = \Illuminate\Support\Facades\Storage::disk('private')
                        ->url($item->product->image);
                }
                return $item;
            });
            return $order;
        });

        return Inertia::render('OrdersPage', [
            'orders' => $orders,
        ]);
    }
}