<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    
    public function index()
    {
        $carts = Cart::with('product')->get();

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
        $product = Product::findOrFail($request->product_id);

        $cart = Cart::where('product_id', $product->id)->first();

        if ($cart) {
            $cart->increment('quantity');
        } else {
            Cart::create([
                'product_id' => $product->id,
                'quantity' => 1,
                'price' => $product->price,
            ]);
        }

        return redirect()->back()->with('success', 'Added to cart');
    }

   
    public function update(Request $request, Cart $cart)
    {
        $cart->update([
            'quantity' => $request->quantity,
        ]);

        return redirect()->back();
    }

    public function destroy(Cart $cart)
    {
        $cart->delete();

        return redirect()->back()->with('success', 'Item removed');
    }
}