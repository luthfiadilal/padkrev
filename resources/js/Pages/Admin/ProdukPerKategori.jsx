import ScrollToTop from '@/Components/shared/ScrollToTop';
import CardProduk from '@/Layouts/Admin/CardProduk';
import { usePage } from '@inertiajs/react';
import Header from '../../Layouts/Admin/Header/Header';
import SidebarLayout from '../../Layouts/Admin/Sidebar/Sidebar';

export default function ProdukPerKategori() {
    const { produkPerKategori, user } = usePage().props;

    return (
        <div className="flex min-h-screen w-full dark:bg-darkgray">
            <SidebarLayout />
            <div className="page-wrapper flex w-full">
                <div className="page-wrapper-sub flex w-full flex-col dark:bg-darkgray">
                    <Header user={user} />
                    <div className="h-full rounded-bb bg-lightgray dark:bg-dark">
                        <div className="w-full">
                            <ScrollToTop>
                                <div className="container space-y-12 px-4 py-10">
                                    {Object.entries(produkPerKategori).map(
                                        ([kategoriId, produkList]) => {
                                            const namaKategori =
                                                produkList[0]?.nama_kategori ??
                                                'Tanpa Kategori';

                                            return (
                                                <div
                                                    key={kategoriId}
                                                    className="space-y-4"
                                                >
                                                    <h2 className="font-bold text-xl text-gray-800 dark:text-white">
                                                        {namaKategori}
                                                    </h2>
                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                                        {produkList.map(
                                                            (produk, index) => (
                                                                <CardProduk
                                                                    key={
                                                                        produk.produk_id
                                                                    }
                                                                    produk={
                                                                        produk
                                                                    }
                                                                    isTerlaris={
                                                                        index ===
                                                                        0
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
    );
}
