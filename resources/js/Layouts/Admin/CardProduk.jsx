import { Icon } from '@iconify/react';

export default function CardProduk({ produk, isTerlaris }) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {/* Badge Terlaris */}
            {isTerlaris && (
                <div className="absolute left-3 top-3 z-10">
                    <div className="font-semibold animate-pulse rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-3 py-1 text-xs text-white shadow-md">
                        🔥 Terlaris
                    </div>
                </div>
            )}

            {/* Gambar Produk */}
            <img
                src={`/storage/${produk.foto}`}
                alt={produk.nama_produk}
                className="h-44 w-full object-cover transition-transform duration-300 hover:scale-105"
            />

            {/* Konten */}
            <div className="space-y-2 p-4">
                {/* Nama Produk */}
                <h3 className="font-semibold line-clamp-1 text-lg text-gray-800 dark:text-white">
                    {produk.nama_produk}
                </h3>

                {/* Info Toko */}
                <div className="flex items-center gap-2">
                    <img
                        src={`/storage/${produk.foto_profil}`}
                        alt={produk.nama_toko}
                        className="h-8 w-8 rounded-full border border-gray-300 object-cover dark:border-gray-600"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium text-sm text-gray-800 dark:text-white">
                            {produk.nama_toko}
                        </span>
                        <span className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                            {produk.nama_penjual}
                        </span>
                    </div>
                </div>

                {/* Harga */}
                <div>
                    <div className="font-bold text-xl text-rose-600 dark:text-rose-400">
                        Rp{produk.harga_diskon ?? produk.harga}
                    </div>
                    {produk.harga_diskon && (
                        <div className="text-sm text-gray-400 line-through">
                            Rp{produk.harga}
                        </div>
                    )}
                </div>

                {/* Total Terjual */}
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Icon
                        icon="solar:cart-check-outline"
                        className="text-base text-primary"
                    />
                    <span>Terjual {produk.total_terjual}</span>
                </div>
            </div>
        </div>
    );
}
