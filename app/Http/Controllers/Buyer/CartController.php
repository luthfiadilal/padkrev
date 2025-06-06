<?php

namespace App\Http\Controllers\Buyer;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Produk;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{

     /**
     * Tampilkan semua item di keranjang pembeli.
     */
    public function index()
    {
        $pembeli = Auth::user()->pembeli;
        $user = Auth::user()->load(['pembeli' => function($query) {
            $query->withCount('carts');
        }]);

        if (!$pembeli) {
            return response()->json(['message' => 'Pembeli tidak ditemukan'], 404);
        }

        $carts = $pembeli->carts()->with(['produk', 'penjual'])->get();

        return Inertia::render('Buyer/Cart', [
            'user' => Auth::user()->load(['pembeli' => function($query) {
                $query->withCount('carts');
            }]),
            'cartCount' => $user->pembeli->carts_count ?? 0,
            'carts' => $carts
        ]);
    }


    /**
     * Tambah produk ke keranjang.
     */
    public function store(Request $request)
    {
        $request->validate([
            'produk_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $pembeli = Auth::user()->pembeli;

        if (!$pembeli) {
            return response()->json(['message' => 'Pembeli tidak ditemukan'], 404);
        }

        $produk = Produk::findOrFail($request->produk_id);

        $hargaSatuan = $produk->harga_diskon ?? $produk->harga;
        $quantity = $request->quantity;
        $totalHarga = Cart::calculateTotal($hargaSatuan, $quantity);

        // Cek apakah produk sudah ada di keranjang
        $existing = Cart::where('pembeli_id', $pembeli->id)
                        ->where('produk_id', $produk->id)
                        ->first();

        if ($existing) {
            // Update quantity dan total
            $existing->quantity += $quantity;
            $existing->harga_total = Cart::calculateTotal($hargaSatuan, $existing->quantity);
            $existing->save();

            return response()->json(['message' => 'Keranjang diperbarui', 'cart' => $existing]);
        }

        // Tambahkan item baru ke keranjang
        $cart = Cart::create([
            'pembeli_id'   => $pembeli->id,
            'produk_id'    => $produk->id,
            'penjual_id'   => $produk->penjual_id,
            'quantity'     => $quantity,
            'harga_satuan' => $hargaSatuan,
            'harga_total'  => $totalHarga,
        ]);

        //
        return redirect()->route('marketplace-index')->with('success', 'Produk berhasil ditambahkan ke keranjang');
    }

    /**
     * Update quantity item di keranjang.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::findOrFail($id);



        $cart->quantity = $request->quantity;
        $cart->harga_total = Cart::calculateTotal($cart->harga_satuan, $cart->quantity);
        $cart->save();

        return redirect()->route('cart.index')->with('success', 'Keranjang berhasil diperbarui');
    }

    /**
     * Hapus item dari keranjang.
     */
    public function destroy($id)
    {
        $cart = Cart::where('pembeli_id', Auth::user()->pembeli->id)->findOrFail($id);

        // $this->authorize('delete', $cart); // Optional jika pakai policy

        $cart->delete();

        return redirect()->route('cart.index')->with('success', 'Produk berhasil dihapus dari keranjang');
    }

    public function count(Request $request)
    {
        $user = Auth::user();
        $count = $user->pembeli->carts()->count();

        return response()->json([
            'count' => $count
        ]);
    }
}
