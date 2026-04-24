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
            ->where('user_id', Auth::id())
            ->get();

        // Use a standard loop to avoid any Model Accessor bugs
        foreach ($wishlist as $item) {
            if ($item->product) {
                $rawPath = $item->product->image;

                if (empty($rawPath)) {
                    $item->product->image = 'https://placehold.co/600x400';
                } elseif (filter_var($rawPath, FILTER_VALIDATE_URL)) {
                    $item->product->image = $rawPath;
                } else {
                    // Manual pathing - Change 'private' to 'public' if testing locally
                    $item->product->image = Storage::disk('private')->url($rawPath);
                }
            }
        }

        return Inertia::render('WishlistPage', [
            'wishlist' => $wishlist
        ]);
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