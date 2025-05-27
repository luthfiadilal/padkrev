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
            $table->foreignId('penjual_id')->constrained('penjuals')->onDelete('cascade');
            $table->foreignId('kategori_id')->constrained('kategoris')->onDelete('restrict');
            $table->foreignId('tipe_produk_id')->constrained('tipe_produks')->onDelete('restrict');
            $table->string('nama');
            $table->string('slug')->unique();
            $table->text('deskripsi')->nullable(); // Diubah ke text untuk deskripsi panjang
            $table->string('foto')->nullable();
            $table->json('gallery')->nullable(); // Untuk multiple gambar produk
            $table->integer('harga');
            $table->integer('harga_diskon')->nullable(); // Untuk promo/diskon
            $table->string('satuan')->default('pcs')->nullable(); // Satuan produk (kg, liter, pcs, etc)
            // jika produk kategori pakaian ada ukuran dan warna
            $table->string('ukuran')->nullable();
            $table->string('warna')->nullable();
            $table->integer('stok')->nullable();
            $table->boolean('status')->default(true)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
