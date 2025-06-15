<?php

namespace App\Models;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Penjual extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id_penjual',
        'nama_toko',
        'deskripsi',
        'whatsapp_link',
        'no_hp',
        'alamat',
        'foto_profil',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'id_penjual');
    }

    // Tambahkan relasi ke keranjang
    public function carts()
    {
        return $this->hasMany(Cart::class, 'penjual_id');
    }
}
