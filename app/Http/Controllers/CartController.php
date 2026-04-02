<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $carts = Cart::with('product')
            ->where('user_id', Auth::id())
            ->get();

        $total = $carts->sum(function ($item) {
            return $item->price * $item->quantity;
        });

        return Inertia::render('CartPage', [
            'carts' => $carts,
            'total' => $total,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cart) {
            $cart->quantity += 1;
            $cart->save();
        } else {
            $cart = new Cart();
            $cart->user_id = Auth::id();
            $cart->product_id = $request->product_id;
            $cart->quantity = 1;
            $cart->price = $cart->product->price;
            $cart->save();
        }

        return redirect()->back()->with('success', 'Added to cart');
    }

    public function update(Request $request, $id)
    {
        $cart = Cart::findOrFail($id);

        if ($request->type === 'inc') {
            $cart->quantity++;
        }

        if ($request->type === 'dec' && $cart->quantity > 1) {
            $cart->quantity--;
        }

        $cart->save();

        return redirect()->back();
    }

    public function destroy($id)
    {
        $cart = Cart::findOrFail($id);
        $cart->delete();

        return redirect()->back()->with('success', 'Item removed');
    }
}