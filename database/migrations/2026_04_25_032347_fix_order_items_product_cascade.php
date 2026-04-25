<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            // Drop the old cascading foreign key
            $table->dropForeign(['product_id']);

            // Re-add as nullable with nullOnDelete so the row survives
            // product deletion but product_id becomes null (no orphan error)
            $table->foreignId('product_id')
                ->nullable()
                ->change();

            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign(['product_id']);

            $table->foreignId('product_id')
                ->nullable(false)
                ->change();

            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->cascadeOnDelete();
        });
    }
};