<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Elemen extends Model
{
    protected $table = 'elemen';
    protected $fillable = ['name', 'path_image']; // Sesuai dengan kolom di database

    /**
     * Get the URL for the element image
     */
    public function getImageUrlAttribute()
    {
        return asset('img/'.$this->path_image); // Menggunakan path_image dari database
    }

    /**
     * Get the full filesystem path to the image
     */
    public function getImagePathAttribute()
    {
        return public_path('img/'.$this->path_image);
    }
}
