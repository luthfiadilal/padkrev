<?php

namespace App\Http\Controllers;

use App\Models\Elemen;
use Illuminate\Support\Facades\File;

class ElemenController extends Controller
{
    // Ambil data elemen
    public function get($name)
    {
        $elemen = Elemen::where('name', $name)->firstOrFail();

        return response()->json([
            'name' => $elemen->name,
            'path_image' => $elemen->path_image,
            'image_url' => $elemen->image_url // Di-generate dari accessor
        ]);
    }

    // Ambil gambar langsung
    public function getImage($name)
    {
        $elemen = Elemen::where('name', $name)->firstOrFail();
        $path = public_path('img/' . $elemen->path_image);

        if (!File::exists($path)) {
            abort(404, 'Gambar tidak ditemukan');
        }

        return response()->file($path);
    }
}
