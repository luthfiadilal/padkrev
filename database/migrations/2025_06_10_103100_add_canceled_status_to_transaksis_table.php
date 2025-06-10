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
        Schema::table('transaksis', function (Blueprint $table) {
            $table->enum('status', ['belum bayar', 'sudah bayar', 'dibatalkan'])
                  ->default('belum bayar')
                  ->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaksis', function (Blueprint $table) {
            $table->enum('status', ['belum bayar', 'sudah bayar'])
                  ->default('belum bayar')
                  ->change();
        });
    }
};
