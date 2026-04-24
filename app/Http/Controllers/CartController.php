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

        $total = $carts->sum(fn($item) => $item->price * $item->quantity);

        return Inertia::render('CartPage', [
            'carts' => $carts,
            'total' => $total,
        ]);
    }

    public function store(Request $request)
    {
        if (auth()->user()->role === "admin") {
            return back()->withErrors(['message' => 'Admins cannot add items to cart']);
        }

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'sometimes|integer|min:1'
        ]);

        $qtyToAdd = $request->quantity ?? 1;

        DB::beginTransaction();
        try {
            $product = Product::lockForUpdate()->find($request->product_id);

            if ($product->stock_quantity < $qtyToAdd) {
                DB::rollBack();
                return back()->withErrors(['message' => "Only {$product->stock_quantity} items left in stock."]);
            }

            $cart = Cart::where('user_id', auth()->id())
                ->where('product_id', $request->product_id)
                ->first();

            if ($cart) {
                $cart->increment('quantity', $qtyToAdd);
            } else {
                Cart::create([
                    'user_id' => auth()->id(),
                    'product_id' => $request->product_id,
                    'quantity' => $qtyToAdd,
                    'price' => $product->price,
                ]);
            }

            $product->decrement('stock_quantity', $qtyToAdd);
            DB::commit();

            return back()->with('success', "Added to cart");
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to add to cart']);
        }
    }

    public function update(Request $request, Cart $cart)
    {
        if ($cart->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate(['quantity' => 'required|integer|min:1']);

        $newQty = $request->quantity;
        $oldQty = $cart->quantity;
        $difference = $newQty - $oldQty;

        DB::beginTransaction();
        try {
            $product = Product::lockForUpdate()->find($cart->product_id);

            if ($difference > 0) {
                // Increasing quantity: check if product has enough stock
                if ($product->stock_quantity < $difference) {
                    DB::rollBack();
                    return back()->withErrors(['message' => "Only {$product->stock_quantity} more left in stock."]);
                }
                $product->decrement('stock_quantity', $difference);
            } elseif ($difference < 0) {
                // Decreasing quantity: return stock to store
                $product->increment('stock_quantity', abs($difference));
            }

            $cart->update(['quantity' => $newQty]);
            DB::commit();

            return back()->with('success', 'Cart updated');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Update failed']);
        }
    }

    public function destroy($id)
    {
        // Using $id instead of Type Hinting ensures we find the record manually to avoid 403 ghost errors
        $cart = Cart::where('id', $id)->where('user_id', auth()->id())->firstOrFail();

        DB::transaction(function () use ($cart) {
            $cart->product()->increment('stock_quantity', $cart->quantity);
            $cart->delete();
        });

        return back()->with('success', "Item removed");
    }
}