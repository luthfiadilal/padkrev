<?php

namespace App\Models;

use App\Models\Produk;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kategori extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'kategori',
    ];

    public function produk()
    {
        return $this->hasMany(Produk::class);
    }
}
