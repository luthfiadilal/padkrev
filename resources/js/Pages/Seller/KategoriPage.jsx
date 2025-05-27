import ScrollToTop from '@/Components/shared/ScrollToTop';
import KategoriForm from '@/Layouts/Seller/KategoriForm';
import Header from '../../Layouts/Seller/Header/Header';
import SidebarLayout from '../../Layouts/Seller/Sidebar/Sidebar';

export default function KategoriPage({ kategories }) {
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
                                        <KategoriForm kategories={kategories} />
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
