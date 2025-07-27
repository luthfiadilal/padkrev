<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TokoController;
use App\Http\Controllers\ElemenController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\Buyer\CartController;
use App\Http\Controllers\Seller\ProdukController;

use App\Http\Controllers\Seller\DashboardController;
use App\Http\Controllers\Buyer\ProdukBuyerController;
use App\Http\Controllers\Auth\RegisterSellerController;
use App\Http\Controllers\Admin\DashboardAdminController;

Route::get('/', function () {
    if (!Auth::check()) {
        return Inertia::render('LandingPage/Home');
    }

    $user = Auth::user();

    if ($user->isBuyer()) {
        return redirect()->route('marketplace-index');
    }

    if ($user->isSeller()) {
        return redirect()->route('seller.dashboard');
    }

    if ($user->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }

    return Inertia::render('LandingPage/Home');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/dashboard-admin', [DashboardAdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/users', [DashboardAdminController::class, 'userList'])->name('admin.users.index');
    Route::get('/users/{id}/edit', [DashboardAdminController::class, 'update'])->name('admin.users.update');
    Route::delete('/users/{id}', [DashboardAdminController::class, 'destroy'])->name('admin.users.destroy');
    Route::get('/produkpenjual', [DashboardAdminController::class, 'semuaProdukPerKategori'])->name('admin.toko.produk');
    Route::get('/all-transaksi', [DashboardAdminController::class, 'allTransaksi'])->name('admin.transaksi.index');
    Route::get('/admin/register', [RegisterSellerController::class, 'create'])->name('register.seller');
    Route::post('/admin/register', [RegisterSellerController::class, 'store'])->name('register.seller.store');
});

Route::middleware(['auth', 'role:buyer'])->group(function() {
    Route::get('/marketplace', [ProdukBuyerController::class, 'index'])->name('marketplace-index');

    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');       // Halaman keranjang (Inertia)

    // Route::post('/cart', [CartController::class, 'store'])->name('cart.store');      // Tambah ke keranjang
    Route::put('/cart/{id}', [CartController::class, 'update'])->name('cart.update'); // Update qty
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy'); // Hapus item

    Route::post('/checkout', [TransaksiController::class, 'checkout'])->name('checkout');
    Route::get('/history-buyer', [TransaksiController::class, 'history'])->name('history-buyer.index');
    Route::post('/transaksi/{transaksi}/cancel', [TransaksiController::class, 'toCancel'])
    ->name('transaksi.cancel');

    Route::get('/developer-hub', function () {
        $user = Auth::user()->load(['pembeli' => function($query) {
            $query->withCount('carts');
        }]);

        return Inertia::render('Buyer/DeveloperHub', [
            'user' => $user,
            'cartCount' => $user->pembeli->carts_count ?? 0
        ]);
    })->name('developer-hub');
});

Route::middleware(['auth', 'role:buyer'])->prefix('buyer')->group(function () {
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
});


Route::middleware(['auth', 'role:seller'])->group(function() {
    Route::get('/dashboard-seller', DashboardController::class, '--invoke')->name('seller.dashboard');
    Route::get('/produk',[ProdukController::class, 'index'])->name('produk-index');
    Route::get('/produk/create',[ProdukController::class, 'create'])->name('produk-create');
    Route::post('/produk', [ProdukController::class, 'store'])->name('produk-store');
    Route::put('/produk/{id}', [ProdukController::class, 'update'])->name('produk-update');
    Route::delete('/produk/{id}', [ProdukController::class, 'destroy'])->name('produk-destroy');
    Route::get('/produk/{id}/edit', [ProdukController::class, 'edit'])->name('produk-edit');

    Route::get('/history', [TransaksiController::class, 'historyWithPenjual'])->name('historypenjual.index');
    Route::post('transaksi/{transaksi}/update-status', [TransaksiController::class, 'updateStatus'])->name('transaksi.update-status');
    Route::get('/seller/toko', [TokoController::class, 'produkPerKategori'])->name('seller.toko');

    Route::post('/export-transaksi', [DashboardController::class, 'export'])->name('transaksi.export');

    // untuk ambil file (opsional)
    Route::get('/download-export/{file}', function ($file) {
        return response()->download(storage_path("app/public/exports/{$file}"));
    })->name('transaksi.download');

    Route::get('/check-export-file/{filename}', function ($filename) {
        $path = storage_path("app/public/exports/{$filename}");

        $exists = File::exists($path);

        // ✅ Tambahkan log
        Log::info('CHECK EXPORT FILE', [
            'filename' => $filename,
            'path_checked' => $path,
            'file_exists' => $exists,
        ]);

        return response()->json(['exists' => $exists]);
    });

});

Route::get('/kategori', [KategoriController::class, 'create'])->name('kategori-create');
Route::post('/kategori', [KategoriController::class, 'store'])->name('kategori-store');

Route::get('/api/elemen/{name}', [ElemenController::class, 'get']);
Route::get('/elemen/{name}/image', [\App\Http\Controllers\ElemenController::class, 'getImage']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/edit', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
