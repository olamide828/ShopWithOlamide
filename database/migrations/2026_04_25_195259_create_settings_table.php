<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('value');
            $table->timestamps();
        });

        // Seed the default delivery settings right away
        DB::table('settings')->insert([
            // ₦3,000 flat delivery fee charged on every order below the threshold
            ['key' => 'delivery_fee', 'value' => '3000', 'created_at' => now(), 'updated_at' => now()],
            // Orders at or above ₦50,000 get free delivery
            ['key' => 'free_delivery_threshold', 'value' => '50000', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};