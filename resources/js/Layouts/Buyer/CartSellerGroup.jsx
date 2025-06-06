import CartItem from './CartItem';

export default function CartSellerGroup({
    carts,
    selected,
    toggleSelect,
    onUpdateQty,
    onRemoveItem,
}) {
    const getImageProfile = (path) => {
        // if (!path) return '/placeholder.jpg';

        // Kalau path sudah mengandung "foto_profil/", kita anggap path relatif ke storage
        if (path.startsWith('foto_profil/')) {
            return `/storage/${path}`; // tambahkan /storage/ di depan
        }

        // fallback, kalau ada path lain
        return path;
    };

    return (
        <div className="mt-4 rounded border p-4">
            <div className="mb-4 flex items-center gap-2">
                <img
                    src={getImageProfile(carts[0]?.penjual?.foto_profil)}
                    alt="foto_profile"
                    className="h-10 w-10 rounded-full object-cover"
                />
                <h2 className="font-semibold">
                    {carts[0]?.penjual?.nama_toko ?? 'Toko Tidak Diketahui'}
                </h2>
            </div>

            {carts.map((cart) => (
                <CartItem
                    key={cart.id}
                    cart={cart}
                    checked={selected.includes(cart.id)}
                    toggleSelect={() => toggleSelect(cart.id)}
                    onUpdateQty={onUpdateQty}
                    onRemoveItem={onRemoveItem}
                />
            ))}
        </div>
    );
}
