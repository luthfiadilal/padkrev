<?php

namespace App\Models;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pembeli extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id_pembeli',
        'no_hp',
        'alamat',
        'foto_profil',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_pembeli');
    }

    // Tambahkan relasi ke keranjang
    public function carts()
    {
        return $this->hasMany(Cart::class, 'pembeli_id');
    }

    // App/Models/Pembeli.php
    public function getNamaAttribute()
    {
        return $this->user->name;
    }
}
