<?php

namespace App\Models;

use App\Models\Produk;
use App\Models\Penjual;
use App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransaksiItem extends Model
{
    protected $table = 'transaksi_items';

    protected $fillable = [
        'transaksi_id',
        'produk_id',
        'penjual_id',
        'quantity',
        'harga_satuan',
        'harga_total',
    ];

    protected $casts = [
        'harga_satuan' => 'decimal:2',
        'harga_total' => 'decimal:2',
    ];

    // Relasi ke Transaksi
    public function transaksi(): BelongsTo
    {
        return $this->belongsTo(Transaksi::class);
    }

    // Relasi ke Produk
    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class);
    }

    // Relasi ke Penjual
    public function penjual(): BelongsTo
    {
        return $this->belongsTo(Penjual::class);
    }

    // Format harga satuan
    public function getHargaSatuanFormattedAttribute(): string
    {
        return 'Rp ' . number_format($this->harga_satuan, 0, ',', '.');
    }

    // Format harga total
    public function getHargaTotalFormattedAttribute(): string
    {
        return 'Rp ' . number_format($this->harga_total, 0, ',', '.');
    }
}
