<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\webController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;

Route::get('/', [webController::class, 'index']);
Route::get('/login', [webController::class, 'login'])->name('login');
Route::post('/login', [webController::class, 'store']);
Route::get('/register', [webController::class, 'register']);
Route::post('/register', [webController::class, 'create']);
Route::get('/forgotten-password', [webController::class, 'forgottenPassword']);
Route::get('/update-password', [webController::class, 'updatePassword']);
Route::get('/verify-email', [webController::class, 'verifyEmail']);
Route::get('/products', [ProductController::class, 'productPage']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{product}', [ProductController::class, 'update']);
Route::delete('/products/{product}', [ProductController::class, 'destroy']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart', [CartController::class, 'store']);
Route::put('/cart/{cart}', [CartController::class, 'update']);
Route::delete('/cart/{cart}', [CartController::class, 'destroy']);
// Route::get('/view-product', [ProductController::class, 'viewProduct']);

Route::prefix("dashboard")->middleware("auth")->group(function () {
Route::get("/", [  DashboardController::class, 'dashboard']);
Route::get("/products", [ProductController::class, "product"]);
Route::get("/products/{product:slug}", [ProductController::class, 'adminViewProduct']);
});
