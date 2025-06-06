import ScrollToTop from '@/Components/shared/ScrollToTop';
import { router } from '@inertiajs/react';
import { Button } from 'flowbite-react';
import Header from '../../Layouts/Seller/Header/Header';
import ProductFilters from '../../Layouts/Seller/ProductFilters';
import ProductList from '../../Layouts/Seller/ProductList';
import SidebarLayout from '../../Layouts/Seller/Sidebar/Sidebar';

export default function ProdukPage({
    user,
    produks,
    kategoris,
    tipeProduks,
    filters,
}) {
    const handleToCreateProduk = () => {
        router.get(route('produk-create'));
    };
    return (
        <>
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
                                        <div className="mb-6 flex items-center justify-between">
                                            <h1 className="font-bold text-2xl dark:text-white">
                                                Daftar Produk
                                            </h1>
                                            <Button
                                                onClick={handleToCreateProduk}
                                                className="rounded-md bg-primary px-2 py-1 text-sm text-white hover:bg-primaryemphasis dark:bg-blue-700 dark:hover:bg-blue-800"
                                            >
                                                Tambah Produk
                                            </Button>
                                        </div>

                                        <ProductFilters
                                            categories={kategoris}
                                            productTypes={tipeProduks}
                                            filters={filters || {}}
                                        />

                                        {produks.data.length > 0 ? (
                                            <ProductList products={produks} />
                                        ) : (
                                            <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-darkgray">
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Belum ada produk yang
                                                    tersedia.
                                                </p>
                                                <Button
                                                    onClick={
                                                        handleToCreateProduk
                                                    }
                                                    className="mt-4 inline-block rounded-md bg-primary text-sm text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                                                >
                                                    Tambah Produk Pertama
                                                </Button>
                                            </div>
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
