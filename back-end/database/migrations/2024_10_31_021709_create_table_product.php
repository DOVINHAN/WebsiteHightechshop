<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product', function (Blueprint $table) {
            $table->integer('id')->primary();;
            $table->string('name');
            $table->string('sizes');
            $table->string('colors');
            $table->integer('quantity');
            $table->string('description');
            $table->decimal('price');
            $table->decimal('discount_price')->nullable();
            $table->integer('cate_id');
            $table->integer('image_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
