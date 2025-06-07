<?php

namespace App\Models;

use App\Models\Produk;
use App\Models\Pembeli;
use App\Models\Penjual;
use App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cart extends Model
{
     protected $table = 'carts';

    protected $fillable = [
        'pembeli_id',
        'produk_id',
        'penjual_id',
        'quantity',
        'harga_satuan',
        'harga_total'
    ];

    protected $casts = [
        'harga_satuan' => 'decimal:2',
        'harga_total' => 'decimal:2'
    ];

    /**
     * Relasi ke model User (Pembeli)
     */
    public function pembeli(): BelongsTo
    {
        return $this->belongsTo(Pembeli::class, 'pembeli_id');
    }

    /**
     * Relasi ke model Produk
     */
    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }

    /**
     * Relasi ke model Penjual
     */
    public function penjual(): BelongsTo
    {
        return $this->belongsTo(Penjual::class, 'penjual_id');
    }

    public function transaksis()
    {
        return $this->belongsToMany(Transaksi::class, 'cart_transaksi');
    }


    /**
     * Hitung harga total berdasarkan quantity
     */
    public static function calculateTotal($harga, $quantity)
    {
        return $harga * $quantity;
    }

    /**
     * Accessor untuk menampilkan harga dalam format Rupiah
     */
    public function getHargaSatuanFormattedAttribute()
    {
        return 'Rp ' . number_format($this->harga_satuan, 0, ',', '.');
    }

    public function getHargaTotalFormattedAttribute()
    {
        return 'Rp ' . number_format($this->harga_total, 0, ',', '.');
    }
}
