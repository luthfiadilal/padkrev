<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ElemenController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\Buyer\CartController;
use App\Http\Controllers\Seller\ProdukController;
use App\Http\Controllers\Buyer\ProdukBuyerController;

Route::get('/', function () {
    if (!Auth::check()) {
        return Inertia::render('LandingPage/Home');
    }

    $user = Auth::user();

    if ($user->isBuyer()) {
        return redirect()->route('marketplace-index');
    }

    if ($user->isSeller()) {
        return redirect()->route('dashboard-seller');
    }

    if ($user->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }

    return Inertia::render('LandingPage/Home');
});

Route::middleware(['auth', 'role:buyer'])->group(function() {
    Route::get('/marketplace', [ProdukBuyerController::class, 'index'])->name('marketplace-index');

    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');       // Halaman keranjang (Inertia)

    // Route::post('/cart', [CartController::class, 'store'])->name('cart.store');      // Tambah ke keranjang
    Route::put('/cart/{id}', [CartController::class, 'update'])->name('cart.update'); // Update qty
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy'); // Hapus item
});

Route::middleware(['auth', 'role:buyer'])->prefix('buyer')->group(function () {
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
});


Route::middleware(['auth', 'role:seller'])->group(function() {
    Route::get('/dashboard-seller', function () {
        return Inertia::render('Seller/Dashboard');
    })->name('dashboard-seller');
    Route::get('/produk',[ProdukController::class, 'index'])->name('produk-index');
    Route::get('/produk/create',[ProdukController::class, 'create'])->name('produk-create');
    Route::post('/produk', [ProdukController::class, 'store'])->name('produk-store');
    Route::put('/produk/{id}', [ProdukController::class, 'update'])->name('produk-update');
    Route::delete('/produk/{id}', [ProdukController::class, 'destroy'])->name('produk-destroy');
    Route::get('/produk/{id}/edit', [ProdukController::class, 'edit'])->name('produk-edit');



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
