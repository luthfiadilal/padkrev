import ScrollToTop from '@/Components/shared/ScrollToTop';
import KategoriDibeliChart from '@/Layouts/Seller/KategoriDibeliChart';
import KategoriStatList from '@/Layouts/Seller/KategoriStatList';
import MonthlySalesChart from '@/Layouts/Seller/MonthlySalesChart';
import StatCard from '@/Layouts/Seller/StatCard';
import { usePage } from '@inertiajs/react';
import Header from '../../Layouts/Seller/Header/Header';
import SidebarLayout from '../../Layouts/Seller/Sidebar/Sidebar';

export default function Dashboard() {
    const {
        user,
        totalProduk,
        produkPerKategori,
        statusTransaksi,
        penjualanPerBulan,
        kategoriTerbeli,
    } = usePage().props;

    return (
        <div className="flex min-h-screen w-full dark:bg-darkgray">
            <SidebarLayout />
            <div className="page-wrapper flex w-full">
                <div className="page-wrapper-sub flex w-full flex-col dark:bg-darkgray">
                    <Header user={user} />
                    <div className="h-full rounded-bb bg-lightgray dark:bg-dark">
                        <div className="w-full">
                            <ScrollToTop>
                                <div className="container space-y-10 py-10">
                                    <h1 className="font-bold text-2xl text-gray-700 dark:text-white">
                                        Dashboard Penjual
                                    </h1>

                                    {/* Stat Cards */}
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                        {/* Full width on first row */}
                                        <div className="md:col-span-4">
                                            <StatCard
                                                icon="solar:box-bold"
                                                label="Total Produk"
                                                value={totalProduk}
                                                bg="bg-white dark:bg-gray-800"
                                                variant="highlight"
                                            />
                                        </div>

                                        {/* 4 equal cards on second row */}
                                        <StatCard
                                            icon="solar:category-bold"
                                            label="Kategori"
                                            value={
                                                Object.keys(produkPerKategori)
                                                    .length
                                            }
                                            bg="bg-white dark:bg-blue-800"
                                        />
                                        <StatCard
                                            icon="solar:clock-circle-bold"
                                            label="Belum Dibayar"
                                            value={
                                                statusTransaksi.belum_dibayar
                                            }
                                            bg="bg-white dark:bg-yellow-700"
                                        />
                                        <StatCard
                                            icon="solar:check-circle-bold"
                                            label="Sudah Dibayar"
                                            value={
                                                statusTransaksi.sudah_dibayar
                                            }
                                            bg="bg-white dark:bg-green-700"
                                        />
                                        <StatCard
                                            icon="solar:close-circle-bold"
                                            label="Dibatalkan"
                                            value={statusTransaksi.dibatalkan}
                                            bg="bg-white dark:bg-red-700"
                                        />
                                    </div>

                                    {/* Diagram Penjualan Bulanan */}
                                    <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
                                        <h2 className="font-semibold mb-4 text-lg text-gray-700 dark:text-white">
                                            Penjualan per Bulan
                                        </h2>
                                        <MonthlySalesChart
                                            data={penjualanPerBulan}
                                        />
                                    </div>

                                    {/* Diagram Kategori Terbeli */}
                                    <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
                                        <h2 className="font-semibold mb-4 text-lg text-gray-700 dark:text-white">
                                            Produk Terbeli per Kategori
                                        </h2>
                                        <KategoriDibeliChart
                                            data={kategoriTerbeli}
                                        />
                                    </div>

                                    {/* List Produk per Kategori */}
                                    <KategoriStatList
                                        data={produkPerKategori}
                                    />
                                </div>
                            </ScrollToTop>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
