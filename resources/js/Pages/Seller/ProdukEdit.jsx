import ScrollToTop from '@/Components/shared/ScrollToTop';

import EditProduk from '@/Layouts/Seller/EditProduk';
import Header from '../../Layouts/Seller/Header/Header';
import SidebarLayout from '../../Layouts/Seller/Sidebar/Sidebar';

export default function ProdukCreate({ produk, kategoris, tipeProduks }) {
    return (
        <>
            <div className="flex min-h-screen w-full dark:bg-darkgray">
                <SidebarLayout />
                <div className="page-wrapper flex w-full">
                    {/* Header/sidebar */}

                    <div className="page-wrapper-sub flex w-full flex-col dark:bg-darkgray">
                        {/* Top Header  */}
                        <Header />

                        <div
                            className={`h-full rounded-bb bg-lightgray dark:bg-dark`}
                        >
                            {/* Body Content  */}
                            <div className={`w-full`}>
                                <ScrollToTop>
                                    <div className="container py-30">
                                        {/* UI Komponen EditProduk */}
                                        <EditProduk
                                            produk={produk}
                                            kategoris={kategoris}
                                            tipeProduks={tipeProduks}
                                        />
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
