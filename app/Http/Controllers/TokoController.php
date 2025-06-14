<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransaksiItem;
use Illuminate\Support\Facades\DB;

class TokoController extends Controller
{
    public function produkTerbanyakPerKategori()
{
        $data = TransaksiItem::select(
                'produks.id as produk_id',
                'produks.nama as nama_produk',
                'kategoris.id as kategori_id',
                'kategoris.kategori as nama_kategori',
                DB::raw('SUM(transaksi_items.quantity) as total_terjual')
            )
            ->join('produks', 'transaksi_items.produk_id', '=', 'produks.id')
            ->join('kategoris', 'produks.kategori_id', '=', 'kategoris.id')
            ->groupBy('produks.id', 'produks.nama', 'kategoris.id', 'kategoris.kategori')
            ->orderByDesc('total_terjual')
            ->get();

        // Group berdasarkan kategori
        $grouped = $data->groupBy('kategori_id')->map(function ($items) {
            return $items->sortByDesc('total_terjual')->first(); // ambil produk paling laris per kategori
        })->values();

        return response()->json([
            'success' => true,
            'produk_terbanyak_per_kategori' => $grouped,
        ]);
    }
}
