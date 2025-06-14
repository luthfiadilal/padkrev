<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\TransaksiItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TokoController extends Controller
{
    public function produkPerKategori()
    {
        $user = Auth::user()->load('penjual');
        // Ambil semua produk dengan jumlah terjual (bisa 0 juga jika belum pernah dibeli)
        $produk = DB::table('products') // Ganti 'produks' jadi 'products'
            ->leftJoin('transaksi_items', 'products.id', '=', 'transaksi_items.produk_id')
            ->leftJoin('transaksis', 'transaksi_items.transaksi_id', '=', 'transaksis.id')
            ->join('kategoris', 'products.kategori_id', '=', 'kategoris.id')
            ->select(
                'products.id as produk_id',
                'products.nama as nama_produk',
                'products.foto',
                'products.harga',
                'products.harga_diskon',
                'products.stok',
                'products.ukuran',
                'kategoris.id as kategori_id',
                'kategoris.kategori as nama_kategori',
                DB::raw("
                    COALESCE(
                        SUM(CASE
                            WHEN transaksis.status = 'sudah bayar' THEN transaksi_items.quantity
                            ELSE 0
                        END),
                    0) as total_terjual
                ")
            )
            ->where('products.penjual_id', $user->penjual->id)
            ->groupBy('products.id', 'products.nama', 'products.foto', 'products.harga', 'products.harga_diskon', 'products.stok', 'products.ukuran', 'kategoris.id', 'kategoris.kategori')
            ->orderBy('kategoris.id')
            ->orderByDesc('total_terjual')
            ->get()
            ->groupBy('kategori_id');


        return Inertia::render('Seller/TokoPage', [
            'produkPerKategori' => $produk,
            'user' => $user
        ]);
    }
}
