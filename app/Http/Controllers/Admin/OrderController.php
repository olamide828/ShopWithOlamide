<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {

        $orders = Order::with(['user:id,name,email', 'items.product:id,name'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $order->update([
            'status' => $request->status // 'pending', 'shipped', 'delivered'
        ]);

        return back()->with('success', 'Order status updated');
    }
}
