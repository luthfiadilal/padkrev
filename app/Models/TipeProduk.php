<?php

namespace App\Models;

use App\Models\Produk;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipeProduk extends Model
{
    use SoftDeletes;


    protected $table = 'tipe_produks';

    protected $fillable = [
        'tipe_produk',
    ];

    public function produk()
    {
        return $this->hasMany(Produk::class);
    }
}
