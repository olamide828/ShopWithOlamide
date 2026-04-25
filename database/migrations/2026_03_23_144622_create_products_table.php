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
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->string('name'); // Name of the product
        $table->string('slug')->unique(); // URL-friendly version of the name
        $table->text('description')->nullable(); // Detailed info
        $table->decimal('price', 8, 2); // Price with 2 decimal places
        $table->integer('stock_quantity')->default(0); // Tracking inventory
        $table->text('image')->nullable();
        $table->string('location')->nullable();
        $table->string('phone_number')->nullable();
        
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
