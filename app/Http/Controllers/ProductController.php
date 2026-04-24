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

            // 1. Store on 'private' instead of 'public'

            $path = $request->file('image')->store('products', 'private');



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

            $product->image = Storage::disk('private')->url($product->image);

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

            $product->image = Storage::disk('private')->url($product->image);

        }



        return Inertia::render('components/ViewProduct', [

            'product' => $product

        ]);

    }





    public function productPage(Request $request)
    {
        $products = Product::query()
            ->when(
                $request->search,
                fn($q, $search) =>
                $q->where('name', 'LIKE', "%{$search}%")
            )
            ->when(
                $request->category && $request->category !== 'All',
                fn($q) =>
                $q->where('category', $request->category)
            )
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $products->getCollection()->transform(function ($product) {
            $product->image = $product->image
                ? Storage::disk('private')->url($product->image)
                : 'https://placehold.co/400x400';

            return $product;
        });

        return Inertia::render("ProductPage", [
            "products" => $products,
            "filters" => $request->only(['search', 'category']),
            "categories" => Product::select('category')->distinct()->pluck('category')
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

            // Delete the old image from private if it exists

            if ($product->image) {

                Storage::disk('private')->delete($product->image);

            }

            // Store new image on private

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

        // Delete image from cloud before deleting record

        if ($product->image) {

            Storage::disk('private')->delete($product->image);

        }



        $product->delete();



        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully');

    }



}

