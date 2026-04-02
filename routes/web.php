<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\webController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
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
Route::post('/shop/u/products', [ProductController::class, 'store']);
Route::put('/shop/u/products/{product}', [ProductController::class, 'update']);
Route::delete('/shop/u/products/{product}', [ProductController::class, 'destroy']);
Route::get('/shop/u/products/{slug}', [ProductController::class, 'show']);
Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart', [CartController::class, 'store']);
Route::post('/cart/update/{id}', [CartController::class, 'update']);
Route::delete('/cart/{id}', [CartController::class, 'destroy']);
Route::get('/contact', [WebController::class, 'contact']);
Route::get('/terms', [webController::class, 'terms']);
Route::get('/privacy-policy', [webController::class, 'privacyPolicy']);
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();

    return redirect('/');
});
// Route::get('/view-product', [ProductController::class, 'viewProduct']);

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', function () {
        return Inertia::render('Admin/AdminLogin'); // Ensure the file path matches
    });

    Route::get('/admin/register', function () {
        return Inertia::render('Admin/AdminRegister');
    });
});

Route::middleware('auth')->group(function () {
    // This is now correctly: /dashboard
    Route::get('/dashboard', [DashboardController::class, 'userDashboard']);
    // web.php
    Route::put('/user/update', [UserController::class, 'update']);

});

Route::middleware(['admin'])->prefix('admin')->group(function () {
     // Admin dashboard routes
    Route::get('/', [DashboardController::class, 'dashboard']);
    Route::get('/products', [ProductController::class, 'product']);
    Route::get('/products/{product:slug}', [ProductController::class, 'adminViewProduct']);
    Route::get('/stats', [AdminController::class, 'stats']);
   
});
