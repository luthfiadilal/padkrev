<?php

namespace App\Models;

use App\Models\Cart;
use App\Models\Pembeli;
use App\Models\TransaksiItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Transaksi extends Model
{
    protected $table = 'transaksis';

    protected $fillable = [
        'pembeli_id',
        'kode_transaksi',
        'status',
        'total_harga',
    ];

    protected $casts = [
        'total' => 'decimal:2',
    ];

    // Relasi ke Pembeli
    public function pembeli(): BelongsTo
    {
        return $this->belongsTo(Pembeli::class);
    }

    // Relasi ke Cart (banyak cart dalam satu transaksi)
    public function carts(): BelongsToMany
    {
        return $this->belongsToMany(Cart::class, 'cart_transaksi');
    }

    public function items()
    {
        return $this->hasMany(TransaksiItem::class);
    }

    // Generate Kode Transaksi
    public static function generateKode(): string
    {
        return 'TRX-' . strtoupper(uniqid());
    }

    // Format Total
    public function getTotalFormattedAttribute(): string
    {
        return 'Rp ' . number_format($this->total, 0, ',', '.');
    }
}
