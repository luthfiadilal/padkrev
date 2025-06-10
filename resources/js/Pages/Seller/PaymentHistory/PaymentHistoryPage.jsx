import ScrollToTop from '@/Components/shared/ScrollToTop';

import Header from '@/Layouts/Seller/Header/Header';
import PaymentTabsSeller from '@/Layouts/Seller/PaymentTabs';
import SidebarLayout from '@/Layouts/Seller/Sidebar/Sidebar';
import { Head } from '@inertiajs/react';

export default function PaymentHistoryPage({
    belumBayar,
    sudahBayar,
    dibatalkan,
    user,
}) {
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
                                        <Head title="Riwayat Pembayaran" />
                                        <div className="mx-auto p-4">
                                            <h1 className="font-bold mb-4 text-2xl">
                                                Riwayat Pembayaran
                                            </h1>
                                            <PaymentTabsSeller
                                                belumBayar={belumBayar}
                                                sudahBayar={sudahBayar}
                                                dibatalkan={dibatalkan}
                                            />
                                        </div>
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
