<?php

use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\webController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', [webController::class, 'index']);
Route::get('/about', [webController::class, 'about']);
Route::get('/login', [webController::class, 'login'])->name('login');
Route::post('/login', [webController::class, 'store']);
Route::get('/register', [webController::class, 'register']);
Route::post('/register', [webController::class, 'create']);
Route::get('/forgotten-password', [webController::class, 'forgottenPassword']);
Route::get('/update-password', [webController::class, 'updatePassword']);
Route::get('/verify-email', [webController::class, 'verifyEmail']);
Route::get('/shop/u/products', [ProductController::class, 'productPage']);
Route::get('/shop/u/products/load-more', [ProductController::class, 'loadMoreProducts']);
Route::post('/shop/u/products', [ProductController::class, 'store']);
Route::put('/shop/u/products/{product}', [ProductController::class, 'update'])->name('products.update');
Route::delete('/shop/u/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
Route::get('/shop/u/products/{slug}', [ProductController::class, 'show']);
Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart', [CartController::class, 'store']);
Route::put('/cart/{cart}', [CartController::class, 'update']);
Route::delete('/cart/{id}', [CartController::class, 'destroy']);
Route::get('/contact', [WebController::class, 'contact']);
Route::post("/contact", [ContactController::class, 'send']);
Route::get('/terms', [webController::class, 'terms']);
Route::get('/privacy-policy', [webController::class, 'privacyPolicy']);
// Route::get('/seller/login', [SellerController::class, 'sellerLogin']);
// Route::get('/seller/register', [SellerController::class, 'sellerRegister']);
// Route::post('/seller/register', [SellerController::class, 'store']);
// Route::post('/seller/login', [SellerController::class, 'login']);
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();

    return redirect('/');
});
// Route::get('/view-product', [ProductController::class, 'viewProduct']);

// Route::middleware(['auth', 'seller'])->prefix("seller")->group(function () {
//     Route::get('/', [SellerController::class, 'show']);
//     Route::get('/products', [ProductController::class, 'product']);
//     Route::get('/products/{product:slug}', [ProductController::class, 'adminViewProduct']);
// });

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', function () {
        return Inertia::render('Admin/AdminLogin'); // Ensure the file path matches
    });

    Route::get('/admin/register', function () {
        return Inertia::render('Admin/AdminRegister');
    });
});

Route::middleware(['auth', 'not.admin'])->group(function () {
    // This is now correctly: /dashboard
    Route::get('/dashboard', [DashboardController::class, 'userDashboard']);
    Route::get('/manage-account', [WebController::class, 'manageAccount']);
    // web.php
    // Route::get('/user/update', [UserController::class, 'manageAccount']);
    Route::put('/user/update', [UserController::class, 'update']);
    Route::put('/user/password', [UserController::class, 'updatePassword']);
    Route::delete('/user/delete', [UserController::class, 'destroy']);

    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/checkout', [OrderController::class, 'checkout']);

    // Wishlist
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist/{productId}', [WishlistController::class, 'store']);
    Route::delete('/wishlist/{id}', [WishlistController::class, 'destroy']);

});

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    // Admin dashboard routes
    Route::get('/', [DashboardController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/products', [ProductController::class, 'product'])->name('admin.products.index');
    Route::get('/products/{product:slug}', [ProductController::class, 'adminViewProduct'])->name('admin.products.show');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('admin.products.update');
    Route::get('/stats', [AdminController::class, 'stats'])->name('admin.stats');
    Route::post('/users/{user}/toggle-ban', [AdminController::class, 'toggleBan']);
    Route::delete('/delete/users/{user}', [AdminController::class, 'destroy']);
    Route::get('/manage-users', [AdminController::class, 'manageUsers']);
    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::patch('/orders/{order}', [AdminOrderController::class, 'update'])->name('orders.update');

    // The actions (Post for changing data, Delete for removing)
    // Route::post('/users/{user}/toggle-ban', [AdminController::class, 'toggleBan']);
    // Route::delete('/users/{user}', [AdminController::class, 'destroy']);

});
