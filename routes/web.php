<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    // Route::get('/produk', function () {
    //     return Inertia::render('Seller/Produk');
    // })->name('produk');
    // Route::get('/kategori', function () {
    //     return Inertia::render('Seller/Kategori');
    // })->name('kategori');
    // Route::get('/transaksi', function () {
    //     return Inertia::render('Seller/Transaksi');
    // })->name('transaksi');
});






Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
