<?php

namespace App\Http\Controllers\Buyer;

use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Kategori;
use App\Models\TipeProduk;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProdukBuyerController extends Controller
{
    public function index(Request $request)
    {


        $user = Auth::user()->load(['pembeli' => function($query) {
            $query->withCount('carts');
        }]);

        $query = Produk::with([
            'penjual:id,nama_toko,whatsapp_link,no_hp,foto_profil,alamat', // Pastikan id termasuk
            'kategori:id,kategori',
            'tipeProduk:id,tipe_produk'
        ])->where('status', true);

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

        $products = $query->get();

        // Debugging - Hapus setelah verifikasi
        // \Log::info('Products with seller data:', $products->toArray());

        return Inertia::render('Buyer/Marketplace', [
            'products' => $products,
            'categories' => Kategori::all(),
            'types' => TipeProduk::all(),
            'user' => $user,
            'cartCount' => $user->pembeli->carts_count ?? 0
        ]);
    }
}
