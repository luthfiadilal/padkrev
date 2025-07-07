<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Produk;
use Illuminate\Http\Request;
use App\Models\TransaksiItem;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardAdminController extends Controller
{
    public function index()
    {
        $user = Auth::user()->load('admin');

        // Hitung jumlah data
        $totalProduk = Produk::count();
        $totalPenjual = User::where('role', 'seller')->count();
        $totalPembeli = User::where('role', 'buyer')->count();

        // Data registrasi per bulan (12 bulan terakhir)
        $monthlyRegistrations = User::selectRaw('
                YEAR(created_at) as year,
                MONTH(created_at) as month,
                COUNT(*) as total
            ')
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => strtoupper(date('M', mktime(0, 0, 0, $item->month, 1))),
                    'total' => $item->total
                ];
            });

        // Hitung total registrasi
        $totalRegistrations = $monthlyRegistrations->sum('total');

        return Inertia::render('Admin/DashboardAdmin', [
            'totalProduk' => $totalProduk,
            'totalPenjual' => $totalPenjual,
            'totalPembeli' => $totalPembeli,
            'monthlyRegistrations' => $monthlyRegistrations,
            'totalRegistrations' => $totalRegistrations,
            'user' => $user
        ]);
    }

    public function userList(Request $request)
    {
        $currentUserId = Auth::id();
        $user = Auth::user()->load('admin');

        $search = $request->input('search');
        $role = $request->input('role');
        $sort = $request->input('sort', 'asc'); // default A-Z
        $editId = $request->input('editId'); // id user yg ingin diedit

        $usersQuery = User::with(['admin', 'penjual', 'pembeli'])
            ->where('id', '!=', $currentUserId);

        if ($role) {
            $usersQuery->where('role', $role);
        }

        if ($search) {
            $usersQuery->where('name', 'like', "%{$search}%");
        }

        $users = $usersQuery->orderBy('name', $sort)->paginate(10);

        // Ambil data user untuk diedit jika ada editId
        $editUser = null;
        if ($editId) {
            $editUser = User::with(['admin', 'penjual', 'pembeli'])->find($editId);
        }

        return Inertia::render('Admin/UserPage', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'role' => $role,
                'sort' => $sort,
            ],
            'editUser' => $editUser,
            'user' => $user
        ]);
    }

     public function edit($id)
    {
        $user = User::with(['penjual', 'pembeli', 'admin'])->findOrFail($id);

        return inertia('Admin/', [
            'editUser' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($user->isSeller() && $user->penjual) {
            $user->penjual->update($request->only(['nama_toko',  'no_hp', 'alamat', ]));
        } elseif ($user->isBuyer() && $user->pembeli) {
            $user->pembeli->update($request->only(['no_hp', 'alamat', ]));
        } elseif ($user->isAdmin() && $user->admin) {
            $user->admin->update($request->only(['no_hp', 'alamat', ]));
        }

        return redirect()->route('admin.users.index')->with('success', 'User berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $user = User::with(['penjual', 'pembeli', 'admin'])->findOrFail($id);

        if ($user->isSeller() && $user->penjual) {
            $user->penjual->delete();
        } elseif ($user->isBuyer() && $user->pembeli) {
            $user->pembeli->delete();
        } elseif ($user->isAdmin() && $user->admin) {
            $user->admin->delete();
        }

        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User berhasil dihapus.');
    }

    public function semuaProdukPerKategori()
    {
        $user = Auth::user()->load('admin');
        $produk = DB::table('products')
            ->leftJoin('transaksi_items', 'products.id', '=', 'transaksi_items.produk_id')
            ->leftJoin('transaksis', 'transaksi_items.transaksi_id', '=', 'transaksis.id')
            ->join('kategoris', 'products.kategori_id', '=', 'kategoris.id')
            ->join('penjuals', 'products.penjual_id', '=', 'penjuals.id')
            ->join('users', 'penjuals.id_penjual', '=', 'users.id')
            ->whereNull('penjuals.deleted_at')
            ->select(
                'products.id as produk_id',
                'products.nama as nama_produk',
                'products.foto',
                'products.harga',
                'products.harga_diskon',
                'products.stok',
                'products.ukuran',
                'products.penjual_id',
                'penjuals.nama_toko',
                'penjuals.foto_profil', // ← ini yang benar
                'kategoris.id as kategori_id',
                'kategoris.kategori as nama_kategori',
                DB::raw("COALESCE(SUM(CASE WHEN transaksis.status = 'sudah bayar' THEN transaksi_items.quantity ELSE 0 END), 0) as total_terjual")
            )

            ->groupBy(
                'products.id',
                'products.nama',
                'products.foto',
                'products.harga',
                'products.harga_diskon',
                'products.stok',
                'products.ukuran',
                'products.penjual_id',
                'penjuals.nama_toko',
                'penjuals.foto_profil',
                'kategoris.id',
                'kategoris.kategori'
            )
            ->orderBy('kategoris.id')
            ->orderByDesc('total_terjual')
            ->get()
            ->groupBy('kategori_id');

        return Inertia::render('Admin/ProdukPerKategori', [
            'produkPerKategori' => $produk,
            'user' => $user
        ]);
    }

    public function allTransaksi()
    {
        $user = Auth::user()->load('admin');
        $transaksiItems = TransaksiItem::with([
            'transaksi.pembeli.user',
            'produk',
            'penjual.user'
        ])
            ->orderByDesc('created_at')
            ->get()
            ->groupBy('transaksi.kode_transaksi');

        return Inertia::render('Admin/AllTransaksi', [
            'transaksiList' => $transaksiItems,
            'user' => $user
        ]);
    }


}
