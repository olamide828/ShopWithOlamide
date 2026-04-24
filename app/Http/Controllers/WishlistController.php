<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlist = Wishlist::with('product')
            ->where('user_id', auth()->id())
            ->get()
            ->map(function ($item) {
                if ($item->product && $item->product->image) {
                    $path = $item->product->image;

                    // If it's a full URL already (like an external link), keep it
                    if (filter_var($path, FILTER_VALIDATE_URL)) {
                        $item->product->image = $path;
                    } else {
                        // Manually generate the Cloud/Private URL just like ProductController
                        $item->product->image = Storage::disk('private')->url($path);
                    }
                } else if ($item->product) {
                    // Fallback if the product exists but has no image string
                    $item->product->image = 'https://placehold.co/600x400';
                }
                
                return $item;
            });

        return Inertia::render('WishlistPage', ['wishlist' => $wishlist]);
    }

    public function store($productId)
    {
        Wishlist::firstOrCreate([
            'user_id' => Auth::id(),
            'product_id' => $productId,
        ]);

        return back()->with('success', 'Added to wishlist');
    }

    public function destroy($id)
    {
        Wishlist::where('id', $id)
            ->where('user_id', Auth::id())
            ->delete();

        return back()->with('success', 'Removed from wishlist');
    }
}