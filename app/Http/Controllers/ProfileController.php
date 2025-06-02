<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index()
    {
        $user = Auth::user()->load(['penjual', 'pembeli', 'admin']);

        return match ($user->role) {
            'seller' => Inertia::render('Seller/ProfilePage', [
                'user' => $user,
                'roleData' => $user->penjual
            ]),
            'buyer' => Inertia::render('Buyer/ProfilePage', [
                'user' => $user,
                'roleData' => $user->pembeli
            ]),
            'admin' => Inertia::render('Admin/ProfilePage', [
                'user' => $user,
                'roleData' => $user->admin
            ]),
            default => abort(403, 'Unauthorized role'),
        };
    }

    public function edit()
    {
        $user = Auth::user()->load(['penjual', 'pembeli', 'admin']);

        return match ($user->role) {
            'seller' => Inertia::render('Seller/EditPage', [
                'user' => $user,
                'roleData' => $user->penjual
            ]),
            'buyer' => Inertia::render('Buyer/EditPage', [
                'user' => $user,
                'roleData' => $user->pembeli
            ]),
            'admin' => Inertia::render('Admin/EditPage', [
                'user' => $user,
                'roleData' => $user->admin
            ]),
            default => abort(403, 'Unauthorized role'),
        };


    }


    /**
     * Update the user's profile information.
     */
   public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,{$user->id}",
            'no_hp' => 'nullable|string|max:20',
            'alamat' => 'nullable|string|max:255',
            'foto_profil' => 'nullable|image|max:2048', // opsional
        ]);

        $user->update($request->only('name', 'email'));

        $fotoProfilPath = null;
        if ($request->hasFile('foto_profil')) {
            $fotoProfilPath = $request->file('foto_profil')->store('foto_profil', 'public');
        }

        match ($user->role) {
            'seller' => $user->penjual()->updateOrCreate(
                ['id_penjual' => $user->id],
                [
                    'nama_toko' => $request->nama_toko,
                    'deskripsi' => $request->deskripsi,
                    'whatsapp_link' => $request->whatsapp_link,
                    'no_hp' => $request->no_hp,
                    'alamat' => $request->alamat,
                    'foto_profil' => $fotoProfilPath ?? $user->penjual->foto_profil ?? null,
                ]
            ),
            'buyer' => $user->pembeli()->updateOrCreate(
                ['id_pembeli' => $user->id],
                [
                    'no_hp' => $request->no_hp,
                    'alamat' => $request->alamat,
                    'foto_profil' => $fotoProfilPath ?? $user->pembeli->foto_profil ?? null,
                ]
            ),
            'admin' => $user->admin()->updateOrCreate(
                ['id_admin' => $user->id],
                [
                    'no_hp' => $request->no_hp,
                    'alamat' => $request->alamat,
                    'foto_profil' => $fotoProfilPath ?? $user->admin->foto_profil ?? null,
                ]
            ),
        };

        return back()->with('message', 'Profil berhasil diperbarui.');
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/dashboard-seller');
    }
}
