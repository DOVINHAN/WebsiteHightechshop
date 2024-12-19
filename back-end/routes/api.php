<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
# ROUTER ADMIN
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\VarientController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ImageController;


    #Categories
    Route::prefix('categories')->group(function(){
    // add categories
    Route::get('list', [CategoriesController::class, 'index']);
    Route::post('add', [CategoriesController::class, 'store']);
    Route::get('detail/{id}',[CategoriesController::class, 'show']);
    // Update
    Route::put('update/{id}', [CategoriesController::class, 'update']);
     // Delete
     Route::delete('delete/{id}',[CategoriesController::class, 'destroy']);
});

    #Product
    Route::prefix('product')->group(function(){
    // Add product
    Route::get('list',[ProductController::class, 'index']);
    Route::get('category/{id}', [ProductController::class, 'showByCategory']);
    Route::post('add',[ProductController::class,'store']);
    Route::get('detail/{id}',[ProductController::class,'show']);
    // Update
    Route::put('update/{id}', [ProductController::class, 'update']);
     // Delete
     Route::delete('delete/{id}',[ProductController::class, 'destroy']);
});

    #Varient (biến thể sp)
    Route::prefix('varient')->group(function(){
    // Add varient
    Route::get('list',[VarientController::class, 'index']);
    Route::post('add',[VarientController::class,'store']);
    Route::get('detail/{id}',[VarientController::class,'show']);
    // Update
    Route::put('update/{id}', [VarientController::class, 'update']);
     // Delete
     Route::delete('delete/{id}',[VarientController::class, 'destroy']);
 });

    #Feedback
    Route::prefix('feedback')->group(function(){
    // Feedback list
    Route::get('list',[FeedbackController::class, 'index']);
    Route::post('add',[FeedbackController::class, 'store']);
    // Delete
    Route::delete('delete/{id}',[FeedbackController::class, 'destroy']);
});

    #Order
    Route::prefix('order')->group(function(){
    // Order list
    Route::get('list',[OrderController::class, 'index']);
    Route::get('detail/{id}',[OrderController::class,'show']);
    // Delete
    Route::delete('delete/{id}',[OrderController::class, 'destroy']);
 });

    #Image
    Route::prefix('image')->group(function(){
    // Feedback list
    Route::get('list',[ImageController::class, 'index']);
    Route::post('add',[ImageController::class, 'store']);
    // Delete
    Route::delete('delete/{id}',[ImageController::class, 'destroy']);
});
