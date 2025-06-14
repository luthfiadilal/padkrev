<?php

namespace App\Http\Controllers\Seller;

use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Models\TransaksiItem;
use Illuminate\Support\Carbon;
use App\Jobs\ExportTransaksiJob;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller
{


    public function __invoke()
    {
        $user = Auth::user();
        $penjualId = optional($user->penjual)->id;

        $totalProduk = Produk::where('penjual_id', $penjualId)->count();

        $produkPerKategori = Produk::where('penjual_id', $penjualId)
            ->with('kategori')
            ->get()
            ->groupBy('kategori.kategori')
            ->map(fn($group) => $group->count());

        $transaksiItems = TransaksiItem::where('penjual_id', $penjualId)
            ->with(['transaksi', 'produk.kategori'])
            ->get();

        $transaksiGroup = $transaksiItems->groupBy(fn($item) => $item->transaksi->status);
        $jumlahBelumDibayar = $transaksiGroup->get('belum bayar')?->count() ?? 0;
        $jumlahSudahDibayar = $transaksiGroup->get('sudah bayar')?->count() ?? 0;
        $jumlahDibatalkan = $transaksiGroup->get('dibatalkan')?->count() ?? 0;

        // 📅 Statistik per bulan
        $penjualanPerBulan = $transaksiItems
            ->filter(fn($item) => $item->transaksi->status === 'sudah bayar')
            ->groupBy(fn($item) => Carbon::parse($item->transaksi->created_at)->format('Y-m')) // misalnya "2025-06"
            ->map(fn($items, $key) => [
                'bulan' => Carbon::parse($key . '-01')->isoFormat('MMMM Y'), // "Juni 2025"
                'jumlah' => $items->count(),
            ])
            ->values();
        // $penjualanPerBulan = $transaksiItems
        //     ->filter(fn($item) => $item->transaksi->status === 'sudah bayar') // hanya yang berhasil
        //     ->groupBy(fn($item) => Carbon::parse($item->transaksi->created_at)->format('M')) // contoh: Jan, Feb
        //     ->map(fn($items) => $items->count());

        // 🧩 Statistik kategori dari produk yang terbeli
        $kategoriTerbeli = $transaksiItems
            ->filter(fn($item) => $item->transaksi->status === 'sudah bayar')
            ->groupBy(fn($item) => optional($item->produk->kategori)->kategori ?? 'Tidak Diketahui')
            ->map(fn($items) => $items->count());

        return Inertia::render('Seller/Dashboard', [
            'user' => Auth::user()->load('penjual'),
            'totalProduk' => $totalProduk,
            'produkPerKategori' => $produkPerKategori,
            'statusTransaksi' => [
                'belum_dibayar' => $jumlahBelumDibayar,
                'sudah_dibayar' => $jumlahSudahDibayar,
                'dibatalkan' => $jumlahDibatalkan,
            ],
            'penjualanPerBulan' => $penjualanPerBulan,
            'kategoriTerbeli' => $kategoriTerbeli->map(function ($jumlah, $kategori) {
                return [
                    'kategori' => $kategori,
                    'jumlah' => $jumlah,
                ];
            })->values(),
        ]);
    }

    public function export(Request $request)
    {
        $bulan = $request->input('bulan');
        $tahun = $request->input('tahun');
        $status =  $request->status;

        // Nama file disiapkan di sini agar diketahui UI
        $fileName = "transaksi_{$bulan}_{$tahun}_" . time() . ".xlsx";

        ExportTransaksiJob::dispatch($bulan, $tahun, $status, $fileName);

        return response()->json([
            'success' => true,
            'message' => 'File akan segera tersedia.',
            'file' => $fileName,
        ]);
    }

}
