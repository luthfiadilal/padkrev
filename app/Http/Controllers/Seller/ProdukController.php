<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
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
    public function index(Request $request)
    {
        $user = Auth::user()->load('penjual');
        $query = Produk::where('penjual_id', Auth::user()->penjual->id)
        ->with(['kategori:id,kategori', 'tipeProduk:id,tipe_produk']);

        // Filter by category
        if ($request->categoryId) {
            $query->where('kategori_id', $request->categoryId);
        }

        // Filter by product type
        if ($request->productTypeId) {
            $query->where('tipe_produk_id', $request->productTypeId);
        }

        // Sorting
        switch ($request->sortBy) {
            case 'price_asc':
                $query->orderBy('harga');
                break;
            case 'price_desc':
                $query->orderByDesc('harga');
                break;
            default:
                $query->latest();
                break;
        }

        $produks = $query->paginate(10);

        // Get all categories and product types for filters
        $categories = Kategori::all();
        $productTypes = TipeProduk::all();

        return Inertia::render('Seller/Index', [
            'user' => $user,
            'produks' => $produks,
            'kategoris' => $categories,
            'tipeProduks' => $productTypes,
            'filters' => $request->only(['sortBy', 'categoryId', 'productTypeId']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Seller/ProdukCreate', [

            'kategoris' => Kategori::all(),
            'tipeProduks' => TipeProduk::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)

    {

        \Log::info('Store method triggered');
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'tipe_produk_id' => 'required_without:new_tipe_produk',
            'new_tipe_produk' => 'required_without:tipe_produk_id|string|max:255|unique:tipe_produks,tipe_produk',
            'deskripsi' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'harga' => 'required|integer|min:0',
            'harga_diskon' => 'nullable|integer|min:0',
            'satuan' => 'required|string',
            'ukuran' => 'nullable|string',
            'warna' => 'nullable|string',
            'stok' => 'nullable|integer|min:0',
            'status' => 'nullable|boolean'
        ], [
        'tipe_produk_id.required_without' => 'Pilih tipe produk atau buat baru',
        'new_tipe_produk.required_without' => 'Isi nama tipe produk baru',
    ]);

        if ($validator->fails()) {
             \Log::info('VALIDASI GAGAL', $validator->errors()->toArray());
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();
        $data['penjual_id'] = Auth::user()->penjual->id;

        $data['status'] = $request->has('status');


        if ($request->has('new_tipe_produk') && !empty($request->new_tipe_produk)) {
            $tipeProduk = TipeProduk::create([
                'tipe_produk' => $request->new_tipe_produk
            ]);
            $data['tipe_produk_id'] = $tipeProduk->id;
        }


        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('produk/foto', 'public');
        }


        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $image) {
                $path = $image->store('produk/gallery', 'public');
                $galleryPaths[] = $path;
            }
            $data['gallery'] = $galleryPaths;
        }

        \Log::info('Data produk:', $data);

        Produk::create($data);

        return redirect()->route('produk-index')->with('success', 'Produk berhasil ditambahkan');
    }


    public function show($id)
    {
        // Hanya bisa melihat produk miliknya sendiri
        $produk = Produk::where('penjual_id', Auth::user()->penjual->id)
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
        $produk = Produk::where('penjual_id', Auth::user()->penjual->id)
            ->findOrFail($id);

        return Inertia::render('Seller/ProdukEdit', [
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
        $produk = Produk::where('penjual_id', Auth::user()->penjual->id)
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

        return redirect()->route('produk-index')->with('success', 'Produk berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Pastikan produk milik penjual yang login
        $produk = Produk::where('penjual_id', Auth::user()->penjual->id)
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

        return redirect()->route('produk-index')->with('success', 'Produk berhasil dihapus');
    }

    /**
     * Hapus gambar dari gallery
     */
    public function deleteGalleryImage($id, $index)
    {
        // Pastikan produk milik penjual yang login
        $produk = Produk::where('penjual_id', Auth::user()->penjual->id)
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
