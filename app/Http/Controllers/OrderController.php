<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items.product')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return inertia('Orders', ['orders' => $orders]);
    }

    public function checkout(Request $request)
    {
        $carts = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();

        if ($carts->isEmpty()) {
            return back()->withErrors(['message' => 'Your cart is empty.']);
        }

        $subtotal = $carts->sum(fn($item) => $item->price * $item->quantity);
        $deliveryFee = (int) Setting::getValue('delivery_fee', 3000);
        $freeDeliveryThreshold = (int) Setting::getValue('free_delivery_threshold', 50000);
        $appliedDeliveryFee = $subtotal >= $freeDeliveryThreshold ? 0 : $deliveryFee;
        $total = $subtotal + $appliedDeliveryFee;

        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => Auth::id(),
                'total' => $total,
                'status' => 'paid',
            ]);

            foreach ($carts as $cart) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cart->product_id,
                    'quantity' => $cart->quantity,
                    'price' => $cart->price,
                ]);
            }

            Cart::where('user_id', Auth::id())->delete();

            DB::commit();
            return back()->with('success', 'Order placed successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Checkout failed. Please try again.']);
        }
    }
}