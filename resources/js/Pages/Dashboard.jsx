import SidebarLayout from '@/Layouts/Seller/Sidebar/Sidebar';
import Header from '../Layouts/Seller/Header/Header';

export default function Dashboard() {
    return (
        <>
            <div className="flex min-h-screen w-full dark:bg-darkgray">
                <div className="page-wrapper flex w-full">
                    {/* Header/sidebar */}
                    <SidebarLayout />
                    <div className="page-wrapper-sub flex w-full flex-col dark:bg-darkgray">
                        {/* Top Header  */}
                        <Header />

                        <div
                            className={`h-full rounded-bb bg-lightgray dark:bg-dark`}
                        >
                            {/* Body Content  */}
                            <div className={`w-full`}>
                                {/* <ScrollToTop>
                                    <div className="container py-30">
                                        <Outlet />
                                    </div>
                                </ScrollToTop> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
