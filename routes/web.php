<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ElemenController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\Seller\ProdukController;

Route::get('/', function () {
    return Inertia::render('LandingPage/Home');
});

Route::middleware(['auth', 'role:seller'])->group(function() {
    Route::get('/dashboard-seller', function () {
        return Inertia::render('Seller/Dashboard');
    })->name('dashboard-seller');

    // Route::get('/toko', function () {
    //     return Inertia::render('Seller/Toko');
    // })->name('toko');
    Route::get('/produk',[ProdukController::class, 'index'])->name('produk-index');
    Route::get('/produk/create',[ProdukController::class, 'create'])->name('produk-create');
    Route::post('/produk', [ProdukController::class, 'store'])->name('produk-store');
    Route::put('/produk/{id}', [ProdukController::class, 'update'])->name('produk-update');
    // Route::get('/kategori', function () {
    //     return Inertia::render('Seller/Kategori');
    // })->name('kategori');
    // Route::get('/transaksi', function () {
    //     return Inertia::render('Seller/Transaksi');
    // })->name('transaksi');


});

Route::get('/kategori', [KategoriController::class, 'create'])->name('kategori-create');
Route::post('/kategori', [KategoriController::class, 'store'])->name('kategori-store');

Route::get('/api/elemen/{name}', [ElemenController::class, 'get']);
Route::get('/img/elemen/{name}', [ElemenController::class, 'getImage']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/edit', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
