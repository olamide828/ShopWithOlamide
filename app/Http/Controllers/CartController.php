<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

        $product = Product::find($request->product_id);

        if ($product->stock_quantity <= 0) {
            return back()->withErrors(['message' => 'Product is out of stock']);
        }

        DB::beginTransaction();

        try {
            $cart = Cart::where('user_id', Auth::id())
                ->where('product_id', $request->product_id)
                ->first();

            if ($cart) {
                if ($cart->quantity + 1 > $product->stock_quantity) {
                    DB::rollback();
                    return back()->withErrors([
                        'message' => "Only {$product->stock_quantity} left in stock. You have {$cart->quantity} in cart."
                    ]);
                }

                $cart->quantity += 1;
                $cart->save();
            } else {
                $cart = new Cart();
                $cart->user_id = Auth::id();
                $cart->product_id = $request->product_id;
                $cart->quantity = 1;
                $cart->price = $product->price;
                $cart->save();
            }

            $product->decrement('stock_quantity');

            DB::commit();

            $cartCount = Cart::where('user_id', Auth::id())->sum('quantity');

            return redirect()->back()->with([
                'success' => "{$product->name} added to cart",
                'cartCount' => $cartCount
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to add to cart']);
        }
    }

    public function update(Request $request, Cart $cart)
    {
        $request->validate([
            'quantity' => 'required|integar|min:1'
        ]);

        $product = $cart->product;
        $newQty = (int) $request->quantity;
        $oldQty = $cart->quantity;

        if ($newQty < 1) {
            return back()->withErrors(['message' => 'Quantity cannot be less than 1']);
        }

        $difference = $newQty - $oldQty;

        DB::beginTransaction();

        try {
            if ($difference > 0) {
                if ($product->stock_quantity < $difference) {
                    DB::rollBack();
                    return back()->withErrors([
                        'message' => "Only {$product->stock_quantity} more left in stock. You already have {$oldQty} in cart."
                    ]);
                }
                $product->decrement('stock_quantity', $difference);
            } else if ($difference < 0) {
                $product->increment('stock_quantity', abs($difference));
            }
            $cart->update(['quantity' => $newQty]);

            DB::commit();
            return back()->with('success', 'Cart updated');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to update cart']);
        }

    }

    public function destroy(Cart $cart)
    {
        DB::beginTransaction();
        try {
            Product::where('id', $cart->product_id)
                ->increment('stock_quantity', $cart->quantity);

            $cart->delete();
            DB::commit();

            return back()->with('success', 'Removed from cart');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['message' => 'Failed to remove']);
        }
    }
}