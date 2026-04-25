<?php
// database/migrations/xxxx_add_device_info_to_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('last_ip')->nullable();
            $table->string('last_device')->nullable();
            $table->string('last_browser')->nullable();
            $table->string('last_os')->nullable();
            $table->timestamp('last_seen_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['last_ip', 'last_device', 'last_browser', 'last_os', 'last_seen_at']);
        });
    }
};