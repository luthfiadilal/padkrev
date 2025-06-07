<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use App\Models\TransaksiItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TransaksiController extends Controller
{

    public function show($id)
    {
        $transaksi = Transaksi::with(['items.produk', 'items.penjual'])->findOrFail($id);

        // Pastikan hanya pembeli yang punya transaksi ini yang bisa melihat
        if ($transaksi->pembeli_id !== Auth::user()->pembeli->id) {
            abort(403, 'Akses tidak diizinkan.');
        }

        return inertia('Buyer/Transaksi/Show', [
            'transaksi' => $transaksi,
        ]);
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'cart_ids' => 'required|array',
            'cart_ids.*' => 'exists:carts,id',
        ]);

        $cartIds = $request->input('cart_ids');

        $carts = Cart::whereIn('id', $cartIds)
            ->where('pembeli_id', Auth::user()->pembeli->id)
            ->get();

        if ($carts->isEmpty()) {
            return back()->with('error', 'Tidak ada item yang valid untuk diproses.');
        }

        DB::beginTransaction();

        try {
            // Kelompokkan cart berdasarkan penjual_id
            $groupedCarts = $carts->groupBy('penjual_id');

            $transaksiIds = [];

            foreach ($groupedCarts as $penjualId => $group) {
                $totalHarga = $group->sum('harga_total');

                // Buat transaksi untuk masing-masing penjual
                $transaksi = Transaksi::create([
                    'pembeli_id' => Auth::user()->pembeli->id,
                    'kode_transaksi' => Transaksi::generateKode(), // pastikan generateKode() unik
                    'status' => 'belum bayar',
                    'total_harga' => $totalHarga,
                ]);

                foreach ($group as $cart) {
                    TransaksiItem::create([
                        'transaksi_id' => $transaksi->id,
                        'produk_id' => $cart->produk_id,
                        'penjual_id' => $cart->penjual_id,
                        'quantity' => $cart->quantity,
                        'harga_satuan' => $cart->harga_satuan,
                        'harga_total' => $cart->harga_total,
                    ]);
                }

                $transaksiIds[] = $transaksi->id;
            }

            // Hapus semua cart yang diproses
            Cart::whereIn('id', $cartIds)->delete();

            DB::commit();

            // Kalau hanya satu transaksi, redirect langsung
            if (count($transaksiIds) === 1) {
                return redirect()->route('transaksi.show', $transaksiIds[0])
                    ->with('success', 'Checkout berhasil! Silakan lanjut ke pembayaran.');
            }

            // Jika lebih dari satu transaksi, redirect ke halaman daftar transaksi atau ringkasan
            return redirect()->route('transaksi.index')
                ->with('success', 'Checkout berhasil untuk beberapa penjual! Silakan lanjut ke pembayaran.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan saat memproses transaksi.');
        }
    }

    public function updateStatus(Request $request, $transaksiId)
    {
        $request->validate([
            'status' => 'required|in:belum bayar,diproses,dikirim,selesai,dibatalkan',
        ]);

        $penjualId = Auth::user()->penjual->id ?? null;

        if (!$penjualId) {
            abort(403, 'Hanya penjual yang dapat mengubah status transaksi.');
        }

        $transaksi = Transaksi::with('items')->findOrFail($transaksiId);

        // Pastikan penjual memiliki produk dalam transaksi ini
        $penjualPunyaItem = $transaksi->items->contains(fn ($item) => $item->penjual_id === $penjualId);

        if (!$penjualPunyaItem) {
            abort(403, 'Anda tidak memiliki produk dalam transaksi ini.');
        }

        // Update status transaksi
        $transaksi->status = $request->status;
        $transaksi->save();

        return back()->with('success', 'Status transaksi berhasil diperbarui.');
    }

    public function history()
    {
        $pembeliId = Auth::user()->pembeli->id;
        $user = Auth::user()->load(['pembeli' => function ($query) {
            $query->withCount('carts');
        }]);

        // Ambil semua transaksi user dengan data lengkap
        $transaksis = Transaksi::with(['items.produk.kategori', 'items.produk.tipeProduk', 'items.penjual'])
            ->where('pembeli_id', $pembeliId)
            ->get();

        // Kelompokkan per status untuk tab
        $belumBayar = $transaksis->where('status', 'belum bayar')->values();
        $sudahBayar = $transaksis->where('status', 'sudah bayar')->values();

        return inertia('Buyer/PaymentHistory/PaymentHistoryPage', [
            'belumBayar' => $belumBayar,
            'sudahBayar' => $sudahBayar,
            'user' => $user,
        ]);
    }



}
