<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Kategori;
use Illuminate\Http\Request;

class KategoriController extends Controller
{
    // Form tambah kategori
    public function create()
    {
        $kategori = Kategori::all();

        // Ganti sesuai path view kamu
        return Inertia::render('Seller/KategoriPage', [
            'kategories' => $kategori
        ]);
    }

    // Simpan kategori ke database
    public function store(Request $request)
    {
        $request->validate([
            'kategori' => 'required|string|max:255|unique:kategoris,kategori',
        ]);

        Kategori::create([
            'kategori' => $request->kategori,
        ]);

        return redirect()->route('kategori-create')->with('success', 'Kategori berhasil ditambahkan!');
    }
}
