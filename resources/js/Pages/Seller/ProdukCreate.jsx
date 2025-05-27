import ScrollToTop from '@/Components/shared/ScrollToTop';
import CreateProduk from '@/Layouts/Seller/CreateProduk';
import Header from '../../Layouts/Seller/Header/Header';
import SidebarLayout from '../../Layouts/Seller/Sidebar/Sidebar';

export default function ProdukCreate({ kategoris, tipeProduks }) {
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
                                        <CreateProduk
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
