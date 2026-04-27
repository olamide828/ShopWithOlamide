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
                $product->image = Storage::disk('private')->url($product->image);
            }
            return $product;
        });

        return Inertia::render("products", [
            "products" => $products
        ]);
    }

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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'category' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|min:10|max:15',
        ]);

        $slug = Str::slug($validated['name']);
        $count = Product::where('slug', 'LIKE', "{$slug}%")->count();
        $validated['slug'] = $count ? "{$slug}-{$count}" : $slug;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'private');
            $validated['image'] = $path;
        }

        $validated['user_id'] = Auth::id();

        Product::create($validated);

        return redirect()->back()->with('success', 'Product created');
    }

    /**
     * Display the specified resource.
     */
    // app/Http/Controllers/ProductController.php — show()

    public function show($slug)
    {
        $product = Product::with('user:id,name')->where('slug', $slug)->firstOrFail();

        if ($product->image && !filter_var($product->image, FILTER_VALIDATE_URL)) {
            $product->image = Storage::disk('private')->url($product->image);
        }

        $deliveryFee = \App\Models\Setting::getValue('delivery_fee', 3000);
        $freeDeliveryThreshold = \App\Models\Setting::getValue('free_delivery_threshold', 50000);

        return Inertia::render('ProductDetails', [
            'product' => $product,
            'deliveryFee' => $deliveryFee !== null ? (int) $deliveryFee : 3000,
            'freeDeliveryThreshold' => $freeDeliveryThreshold !== null ? (int) $freeDeliveryThreshold : 50000,
        ]);
    }

    public function adminViewProduct($slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();

        if ($product->image) {
            $product->image = Storage::disk('private')->url($product->image);
        }

        return Inertia::render('components/ViewProduct', [
            'product' => $product,
        ]);
    }

    /**
     * Public product listing — sends the first 10 products to the page.
     * The frontend uses loadMoreProducts() to fetch the rest on demand.
      */
    //  * JSON endpoint — called by the "Show More" button on the frontend.
    //  * Accepts ?offset=10 and returns the next batch of products.
    //  *
    //  * Add this route in web.php:
    //  *   Route::get('/shop/products/load-more', [ProductController::class, 'loadMoreProducts']);
    //  */
    public function productPage(Request $request)
{
    $perPage = 10;

    $query = $this->buildProductQuery($request);
    $total = (clone $query)->count();

    $products = $query->take($perPage)->get();

    $products->transform(function ($product) {
        $product->image = $product->image
            ? Storage::disk('private')->url($product->image)
            : 'https://placehold.co';
        return $product;
    });

    $categories = Product::whereNotNull('category')
        ->where('category', '!=', '')
        ->distinct()
        ->pluck('category')
        ->values();

    return Inertia::render("ProductPage", [
        "products"   => $products,
        "hasMore"    => $total > $perPage,
        "categories" => $categories,
    ]);
}

/**
 * JSON endpoint — called by "Show More" and whenever filters change.
 * Accepts ?offset=, ?category=, ?search=, ?sort=
 */
public function loadMoreProducts(Request $request)
{
    $offset  = (int) $request->query('offset', 0);
    $perPage = 10;

    $query = $this->buildProductQuery($request);
    $total = (clone $query)->count();

    $products = $query->skip($offset)->take($perPage)->get();

    $products->transform(function ($product) {
        $product->image = $product->image
            ? Storage::disk('private')->url($product->image)
            : 'https://placehold.co';
        return $product;
    });

    return response()->json([
        'products' => $products,
        'hasMore'  => ($offset + $perPage) < $total,
    ]);
}


private function buildProductQuery(Request $request)
{
    $query = Product::latest();

    $category = $request->query('category');
    if ($category && $category !== 'All') {
        $query->where('category', $category);
    }

    $search = trim($request->query('search', ''));
    if ($search !== '') {
        $query->where('name', 'LIKE', "%{$search}%");
    }

    $sort = $request->query('sort', 'default');
    match ($sort) {
        'az'         => $query->reorder('name', 'asc'),
        'za'         => $query->reorder('name', 'desc'),
        'price_low'  => $query->reorder('price', 'asc'),
        'price_high' => $query->reorder('price', 'desc'),
        'latest'     => $query->reorder('created_at', 'desc'),
        default      => null,
    };

    return $query;
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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'category' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|min:10|max:15',
        ]);

        $slug = Str::slug($validated['name']);
        $count = Product::where('slug', 'LIKE', "{$slug}%")->where('id', '<>', $product->id)->count();
        $validated['slug'] = $count ? "{$slug}-{$count}" : $slug;

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('private')->delete($product->image);
            }
            $path = $request->file('image')->store('products', 'private');
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
        if ($product->image) {
            Storage::disk('private')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully');
    }
}