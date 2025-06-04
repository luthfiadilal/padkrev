<?php

namespace App\Models;

use App\Models\Cart;
use App\Models\Kategori;
use App\Models\TipeProduk;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Produk extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'products';

    protected $fillable = [
        'penjual_id',
        'kategori_id',
        'tipe_produk_id',
        'nama',
        'slug',
        'deskripsi',
        'foto',
        'gallery',
        'harga',
        'harga_diskon',
        'satuan',
        'ukuran',
        'warna',
        'stok',
        'status'
    ];

    protected $casts = [
        'gallery' => 'array',
        'status' => 'boolean'
    ];

    // Relasi dengan penjual
    public function penjual()
    {
        return $this->belongsTo(Penjual::class, 'penjual_id', 'id');
    }

    // Relasi dengan kategori
    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }

    // Relasi dengan tipe produk
    public function tipeProduk()
    {
        return $this->belongsTo(TipeProduk::class, 'tipe_produk_id');
    }

    // Tambahkan relasi ke keranjang
    public function carts()
    {
        return $this->hasMany(Cart::class, 'produk_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($produk) {
            $produk->slug = Str::slug($produk->nama);

            // Jika slug sudah ada, tambahkan random string
            if (static::where('slug', $produk->slug)->exists()) {
                $produk->slug = "{$produk->slug}-" . Str::random(5);
            }
        });

        static::updating(function ($produk) {
            if ($produk->isDirty('nama')) {
                $produk->slug = Str::slug($produk->nama);

                // Jika slug sudah ada, tambahkan random string
                if (static::where('slug', $produk->slug)->where('id', '!=', $produk->id)->exists()) {
                    $produk->slug = "{$produk->slug}-" . Str::random(5);
                }
            }
        });
    }

    // Accessor untuk foto
    public function getFotoUrlAttribute()
    {
        return $this->foto ? asset('storage/' . $this->foto) : null;
    }

    // Accessor untuk gallery
    public function getGalleryUrlsAttribute()
    {
        if (!$this->foto) return null;

        // Hapus 'storage/' jika ada di database
        $cleanPath = str_replace('storage/', '', $this->foto);

        return asset("storage/{$cleanPath}");
    }

    // Accessor untuk harga diskon
    public function getHargaDiskonAttribute($value)
    {
        return $value ?? $this->harga;
    }

    // Method untuk cek apakah produk sedang diskon
    public function isDiskon()
    {
        return $this->harga_diskon && $this->harga_diskon < $this->harga;
    }
}
