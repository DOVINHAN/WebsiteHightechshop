<?php
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
# ROUTER ADMIN
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\CartController;

Route::middleware('auth')->group(function () {
        #Categories Management
        Route::prefix('categories')->group(function(){
        // add categories
        Route::post('add', [CategoriesController::class, 'store']);
        Route::get('detail/{id}',[CategoriesController::class, 'show']);
        // Update
        Route::put('update/{id}', [CategoriesController::class, 'update']);
            // Delete
        Route::delete('delete/{id}',[CategoriesController::class, 'destroy']);
    });

        #Image Management
        Route::prefix('image')->group(function(){
        // Image list
        Route::get('list',[ImageController::class, 'index']);
        Route::post('add',[ImageController::class, 'store']);
        Route::get('detail/{id}',[ImageController::class, 'show']);
        // Delete
        Route::delete('delete/{id}',[ImageController::class, 'destroy']);
    });

        #Product Management
        Route::prefix('product')->group(function(){
        // Add product
        Route::post('add',[ProductController::class,'store']);
        // Update
        Route::put('update/{id}', [ProductController::class, 'update']);
         // Delete
         Route::delete('delete/{id}',[ProductController::class, 'destroy']);
    });

        #Order Management
        Route::prefix('order')->group(function(){
        // Order list
        Route::get('list',[OrderController::class, 'index']);
        Route::get('order/{id}/details', [OrderController::class, 'orderDetails']);
        // Delete
        Route::delete('delete/{id}',[OrderController::class, 'destroy']);
    });

        #User Management
        Route::prefix('user')->group(function(){
        // User list
        Route::get('list',[UserController::class, 'index']);
        Route::get('detail/{id}',[UserController::class,'show']);
        Route::get('getWithAddress/{id}',[UserController::class,'showUserAddress']); // xem thông tin địa chỉ, sđt của người dùng
        // Delete
        Route::delete('delete/{id}',[UserController::class, 'destroy']);
    });

        #Address Management
        Route::prefix('address')->group(function(){
        Route::get('list',[AddressController::class, 'index']);
        Route::post('add',[AddressController::class, 'store']);
        Route::get('detail/{id}',[AddressController::class,'show']);
        Route::put('update/{id}', [AddressController::class, 'update']);
        // Delete
        Route::delete('delete/{id}',[AddressController::class, 'destroy']);
    });

});


#HOME PAGE
//Categories
Route::get('categories/list', [CategoriesController::class, 'index']);

//Product
Route::get('product/list',[ProductController::class, 'index']);

Route::get('product/detail/{id}',[ProductController::class,'show']);

Route::get('product/discount-list', [ProductController::class, 'showByDiscount']);

Route::get('product/category/{id}', [ProductController::class, 'showByCategory']);

//Cart
Route::prefix('cart')->group(function () {
    Route::post('add', [CartController::class, 'addToCart']);
    Route::get('view', [CartController::class, 'viewCart']);
    Route::delete('remove/{id}', [CartController::class, 'removeFromCart']);
    Route::delete('clear', [CartController::class, 'clearCart']);
});

Route::middleware('auth')->group(function() {
    Route::post('checkout', [CartController::class, 'checkout']);
});
