<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }



    public function product()
    {
        $products = Product::where('user_id', auth()->id())
            ->orWhereNull('user_id')
            ->latest()
            ->paginate(6);

        // Transform the products to include the full Cloud URL
        $products->getCollection()->transform(function ($product) {
            if ($product->image) {
                $product->image = Storage::disk('s3')->url($product->image);
            }
            return $product;
        });

        return Inertia::render("products", [
            "products" => $products
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'category' => 'nullable|string',
        ]);

        $slug = Str::slug($validated['name']);
        $count = Product::where('slug', 'LIKE', "{$slug}%")->count();
        $validated['slug'] = $count ? "{$slug}-{$count}" : $slug;

        if ($request->hasFile('image')) {
            // 1. Store on 's3' instead of 'public'
            $path = $request->file('image')->store('products', 's3');

            // 2. Store just the path (e.g., "products/image.jpg") 
            // DO NOT add '/storage/' here anymore
            $validated['image'] = $path;
        }

        $validated['user_id'] = Auth::id();

        Product::create($validated);

        return redirect()->back()->with('success', 'Product created');
    }
    /**
     * Display the specified resource.
     */
public function show($slug)
{
    $product = Product::where('slug', $slug)->with('user:id,name')->firstOrFail();

    // Convert path to full Cloud URL
    if ($product->image) {
        $product->image = Storage::disk('s3')->url($product->image);
    }

    return Inertia::render('ProductDetails', [
        'product' => $product
    ]);
}

public function adminViewProduct($slug)
{
    $product = Product::where('slug', $slug)->firstOrFail();

    // Convert path to full Cloud URL
    if ($product->image) {
        $product->image = Storage::disk('s3')->url($product->image);
    }

    return Inertia::render('components/ViewProduct', [
        'product' => $product
    ]);
}


    public function productPage()
    {
        $products = Product::latest()->get();

        // Loop through each product and change the image path to a full URL
        $products->transform(function ($product) {
            if ($product->image) {
                // This generates the full https://... link to your bucket
                $product->image = Storage::disk('s3')->url($product->image);
            } else {
                // Optional: Fallback image if no image exists
                $product->image = 'https://placehold.co';
            }
            return $product;
        });

        return Inertia::render("ProductPage", [
            "products" => $products
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'category' => 'nullable|string',
        ]);

        $slug = Str::slug($validated['name']);
        $count = Product::where('slug', 'LIKE', "{$slug}%")->where('id', '<>', $product->id)->count();
        $validated['slug'] = $count ? "{$slug}-{$count}" : $slug;

        if ($request->hasFile('image')) {
            // Delete the old image from S3 if it exists
            if ($product->image) {
                Storage::disk('s3')->delete($product->image);
            }
            // Store new image on S3
            $path = $request->file('image')->store('products', 's3');
            $validated['image'] = $path;
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete image from cloud before deleting record
        if ($product->image) {
            Storage::disk('s3')->delete($product->image);
        }

        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully');
    }

}
