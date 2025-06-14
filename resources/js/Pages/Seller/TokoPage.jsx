import DynamicHead from '@/Components/DynamicHead';
import ScrollToTop from '@/Components/shared/ScrollToTop';
import Header from '@/Layouts/Seller/Header/Header';
import ProductCard from '@/Layouts/Seller/ProductCard';
import SidebarLayout from '@/Layouts/Seller/Sidebar/Sidebar';
import { usePage } from '@inertiajs/react';

export default function TokoPage() {
    const { produkPerKategori, user } = usePage().props;

    return (
        <>
            <DynamicHead>
                <title>Toko</title>
            </DynamicHead>
            <div className="flex min-h-screen w-full dark:bg-darkgray">
                <SidebarLayout />
                <div className="page-wrapper flex w-full">
                    {/* Header/sidebar */}

                    <div className="page-wrapper-sub flex w-full flex-col dark:bg-darkgray">
                        {/* Top Header  */}
                        <Header user={user} />

                        <div
                            className={`h-full rounded-bb bg-lightgray dark:bg-dark`}
                        >
                            {/* Body Content  */}
                            <div className={`w-full`}>
                                <ScrollToTop>
                                    <div className="container py-30">
                                        {Object.entries(produkPerKategori).map(
                                            ([kategoriId, produkList]) => {
                                                const terlarisId =
                                                    produkList.reduce(
                                                        (max, p) =>
                                                            p.total_terjual >
                                                            max.total_terjual
                                                                ? p
                                                                : max,
                                                    ).produk_id;

                                                return (
                                                    <div
                                                        key={kategoriId}
                                                        className="space-y-4"
                                                    >
                                                        <h2 className="font-bold text-xl text-gray-700 dark:text-white">
                                                            {
                                                                produkList[0]
                                                                    .nama_kategori
                                                            }
                                                        </h2>
                                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                            {produkList.map(
                                                                (produk) => (
                                                                    <ProductCard
                                                                        key={
                                                                            produk.produk_id
                                                                        }
                                                                        product={{
                                                                            id: produk.produk_id,
                                                                            nama: produk.nama_produk,
                                                                            foto: produk.foto,
                                                                            harga:
                                                                                produk.harga ??
                                                                                0,
                                                                            harga_diskon:
                                                                                produk.harga_diskon ??
                                                                                null,
                                                                            ukuran:
                                                                                produk.ukuran ??
                                                                                null,
                                                                            stok:
                                                                                produk.stok ??
                                                                                null,
                                                                        }}
                                                                        isTerlaris={
                                                                            produk.produk_id ===
                                                                            terlarisId
                                                                        } // <-- tambahkan ini
                                                                        onDeleteClick={() =>
                                                                            console.log(
                                                                                'Delete',
                                                                                produk.produk_id,
                                                                            )
                                                                        }
                                                                        onProductClick={() =>
                                                                            console.log(
                                                                                'Clicked',
                                                                                produk.produk_id,
                                                                            )
                                                                        }
                                                                    />
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </ScrollToTop>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
