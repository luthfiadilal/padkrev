<?php

namespace App\Http\Controllers\Seller;

use App\Models\Produk;
use App\Models\Kategori;
use App\Models\TipeProduk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Hanya ambil produk milik penjual yang login
        $produks = Produk::where('penjual_id', Auth::id()->penjual->id_penjual)
            ->with(['kategori', 'tipeProduk'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Seller/Produk/Index', [
            'produks' => $produks
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Seller/Produk/Create', [
            'kategoris' => Kategori::all(),
            'tipeProduks' => TipeProduk::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'tipe_produk_id' => 'required|exists:tipe_produks,id',
            'deskripsi' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'harga' => 'required|integer|min:0',
            'harga_diskon' => 'nullable|integer|min:0',
            'satuan' => 'required|string',
            'ukuran' => 'nullable|string',
            'warna' => 'nullable|string',
            'stok' => 'nullable|integer|min:0',
            'status' => 'boolean'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();
        $data['penjual_id'] = Auth::user()->penjual->id_penjual; // Tambahkan penjual_id dari user yang login

        // Upload foto utama
        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('produk/foto', 'public');
        }

        // Upload gallery
        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $image) {
                $path = $image->store('produk/gallery', 'public');
                $galleryPaths[] = $path;
            }
            $data['gallery'] = $galleryPaths;
        }

        Produk::create($data);

        return redirect()->route('seller.produk.index')->with('success', 'Produk berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Hanya bisa melihat produk miliknya sendiri
        $produk = Produk::where('penjual_id', Auth::id()->penjual->id_penjual)
            ->with(['kategori', 'tipeProduk', 'penjual'])
            ->findOrFail($id);

        return Inertia::render('Seller/Produk/Show', [
            'produk' => $produk
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // Hanya bisa mengedit produk miliknya sendiri
        $produk = Produk::where('penjual_id', Auth::id()->penjual->id_penjual)
            ->findOrFail($id);

        return Inertia::render('Seller/Produk/Edit', [
            'produk' => $produk,
            'kategoris' => Kategori::all(),
            'tipeProduks' => TipeProduk::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Pastikan produk milik penjual yang login
        $produk = Produk::where('penjual_id', Auth::id()->penjual->id_penjual)
            ->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'tipe_produk_id' => 'required|exists:tipe_produks,id',
            'deskripsi' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'harga' => 'required|integer|min:0',
            'harga_diskon' => 'nullable|integer|min:0',
            'satuan' => 'required|string',
            'ukuran' => 'nullable|string',
            'warna' => 'nullable|string',
            'stok' => 'nullable|integer|min:0',
            'status' => 'boolean'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();

        // Update foto utama
        if ($request->hasFile('foto')) {
            // Hapus foto lama jika ada
            if ($produk->foto) {
                Storage::disk('public')->delete($produk->foto);
            }
            $data['foto'] = $request->file('foto')->store('produk/foto', 'public');
        }

        // Tambahkan gambar baru ke gallery
        if ($request->hasFile('gallery')) {
            $currentGallery = $produk->gallery ?? [];

            foreach ($request->file('gallery') as $image) {
                $path = $image->store('produk/gallery', 'public');
                $currentGallery[] = $path;
            }

            $data['gallery'] = $currentGallery;
        }

        $produk->update($data);

        return redirect()->route('seller.produk.index')->with('success', 'Produk berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Pastikan produk milik penjual yang login
        $produk = Produk::where('penjual_id', Auth::id()->penjual->id_penjual)
            ->findOrFail($id);

        // Hapus foto utama
        if ($produk->foto) {
            Storage::disk('public')->delete($produk->foto);
        }

        // Hapus gallery
        if ($produk->gallery) {
            foreach ($produk->gallery as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $produk->delete();

        return redirect()->route('seller.produk.index')->with('success', 'Produk berhasil dihapus');
    }

    /**
     * Hapus gambar dari gallery
     */
    public function deleteGalleryImage($id, $index)
    {
        // Pastikan produk milik penjual yang login
        $produk = Produk::where('penjual_id', Auth::id()->penjual->id_penjual)
            ->findOrFail($id);

        $gallery = $produk->gallery;

        if (isset($gallery[$index])) {
            Storage::disk('public')->delete($gallery[$index]);
            array_splice($gallery, $index, 1);
            $produk->update(['gallery' => $gallery]);
        }

        return response()->json(['success' => true]);
    }
}
