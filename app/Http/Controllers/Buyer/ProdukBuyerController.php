<?php

namespace App\Http\Controllers\Buyer;

use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Kategori;
use App\Models\TipeProduk;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProdukBuyerController extends Controller
{
    public function index(Request $request)
{
    $query = Produk::query()->where('status', true);

    if ($request->kategori) {
        $query->whereIn('kategori_id', (array) $request->kategori);
    }

    if ($request->tipe) {
        $query->whereIn('tipe_produk_id', (array) $request->tipe);
    }

    if ($request->sort === 'asc') {
        $query->orderBy('harga', 'asc');
    } elseif ($request->sort === 'desc') {
        $query->orderBy('harga', 'desc');
    }

    return Inertia::render('Buyer/Marketplace', [
        'products' => $query->get(),
        'categories' => Kategori::all(),
        'types' => TipeProduk::all(),
    ]);
}
}
