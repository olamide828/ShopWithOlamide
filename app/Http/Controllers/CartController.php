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
        if(auth()->user()->role === "admin") {
            return back()->withErrors(['message' => 'Amins cannot add items to cart']);
        }

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'sometimes|integer|min:1'
        ]);

        $qtyToAdd = $request->quantity ?? 1;

      
        DB::beginTransaction();

        try {
            $product = Product::lockForUpdate()->find($request->product_id);

            if($product->stock_quantity <= 0) {
                DB::rollBack();
                return back()->withErrors(['message' => 'Product is out of stock']);
            }

            $cart = Cart::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->first();

            if($cart) {
                if($qtyToAdd > $product->stock_quantity) {
                    DB::rollBack();
                    // $available = $product->stock_quantity - $cart->quantity;
                    return back()->withErrors([
                        'message' => "Only {$product->stock_quantity} in stock. You have {$cart->quantity} in cart. You can add {$available} more."
                    ]);
                }
                $cart->quantity += $qtyToAdd;
                $cart->save();
            } else {
                if($qtyToAdd > $product->stock_quantity) {
                    DB::rollBack();
                    return back()->withErrors(['message' => "Only {$product->stock_quantity} left in stock"]);
                }

                $cart = new Cart();
                $cart->user_id = auth()->id();
                $cart->product_id = $request->product_id;
                $cart->quantity = $qtyToAdd;
                $cart->price = $product->price;
                $cart->save();
            }

            $product->decrement('stock_quantity', $qtyToAdd);
            DB::commit();

           return back()->with(['success' => "{$product->name} added to cart"]);
        } catch(\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to add to cart']);
        }
    }
    

    public function update(Request $request, Cart $cart)
    {

        if ($cart->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $newQty = $request->quantity;
        $oldQty = $cart->quantity;
        $difference = $newQty - $oldQty;

        DB::beginTransaction();

        try {
            if ($difference > 0) {
                $product = Product::lockForUpdate()->find($cart->product_id);
                if ($product->stock_quantity < $difference) {
                    DB::rollBack();
                    return back()->withErrors(['quantity' => 'Not enough stock. Only' . $product->stock_quantity . 'left']);

                }
                $product->decrement('stock_quantity', $difference);
            } else if ($difference < 0) {
                Product::where('id', $cart->product_id)->increment('stock_quantity', abs($difference));
            }

            $cart->update(['quantity' => $newQty]);
            DB::commit();

            return back()->with('success', 'Cart updated');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to update cart']);
        }

    }

    public function destroy(Cart $cart)
    {
      
     if ($cart->user_id !== auth()->id()) {
        abort(403, 'Unathorized');
       }

       
       $cart->product->increment('stock_quantity', $cart->quantity);

       $cart->delete();

       return back()->with('success', "Item removed from cart");
    }

}