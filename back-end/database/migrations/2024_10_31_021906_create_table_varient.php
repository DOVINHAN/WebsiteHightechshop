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
        Schema::create('varient', function (Blueprint $table) {
            $table->integer('id')->primary();
            $table->string('color');
            $table->string('configure');
            $table->integer('quantity');
            $table->integer('price');
            $table->integer('product_id');
            $table->integer('image_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('varient');
    }
};
