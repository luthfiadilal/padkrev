import DynamicHead from '@/Components/DynamicHead';
import ScrollToTop from '@/Components/shared/ScrollToTop';
import KategoriDibeliChart from '@/Layouts/Seller/KategoriDibeliChart';
import KategoriStatList from '@/Layouts/Seller/KategoriStatList';
import MonthlySalesChart from '@/Layouts/Seller/MonthlySalesChart';
import SidebarLayout from '@/Layouts/Seller/Sidebar/Sidebar';
import StatCard from '@/Layouts/Seller/StatCard';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import Header from '../../Layouts/Seller/Header/Header';

export default function Dashboard() {
    const {
        user,
        totalProduk,
        produkPerKategori,
        statusTransaksi,
        penjualanPerBulan,
        kategoriTerbeli,
    } = usePage().props;

    const [bulan, setBulan] = useState('');
    const [tahun, setTahun] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const checkFileReady = async (fileName, attempt = 1) => {
        console.log(`[checkFileReady] Cek ke-${attempt}, file: ${fileName}`);
        const res = await axios.get(`/check-export-file/${fileName}`);
        const exists = res.data.exists;
        console.log('[checkFileReady] Response: exists =', exists);

        if (exists) {
            window.location.href = `/download-export/${fileName}`;
        } else if (attempt < 10) {
            console.log('[checkFileReady] File belum ada, tunggu 2 detik...');
            setTimeout(() => checkFileReady(fileName, attempt + 1), 2000);
        } else {
            alert('Gagal mengunduh file. Silakan coba lagi nanti.');
        }
    };

    const handleExport = async () => {
        if (!bulan || !tahun || !status) return;

        setLoading(true);

        try {
            const res = await axios.post('/export-transaksi', {
                bulan,
                tahun,
                status,
            });

            if (res.data.success) {
                const file = res.data.file;
                // const isReady = await checkFileReady(file);

                await checkFileReady(file);
            } else {
                alert(res.data.message);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DynamicHead>
                <title>Dashboard Penjual</title>
            </DynamicHead>
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
                                                    Object.keys(
                                                        produkPerKategori,
                                                    ).length
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
                                                value={
                                                    statusTransaksi.dibatalkan
                                                }
                                                bg="bg-white dark:bg-red-700"
                                            />
                                        </div>

                                        {/* Diagram Penjualan Bulanan */}
                                        <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800 md:p-6">
                                            <h2 className="font-semibold mb-4 text-lg text-gray-700 dark:text-white">
                                                Penjualan per Bulan
                                            </h2>
                                            <MonthlySalesChart
                                                data={penjualanPerBulan}
                                            />

                                            {/* Export Section */}
                                            <div className="mt-6 flex flex-col justify-center gap-4 md:flex-row md:items-end md:justify-start">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-13 text-gray-700 dark:text-gray-200 md:text-16">
                                                        Pilih Bulan
                                                    </label>
                                                    <select
                                                        className="rounded border p-2 text-13 text-textgray dark:bg-gray-900 dark:text-white md:text-16"
                                                        value={bulan}
                                                        onChange={(e) =>
                                                            setBulan(
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            -- Pilih Bulan --
                                                        </option>
                                                        {Array.from(
                                                            { length: 12 },
                                                            (_, i) => (
                                                                <option
                                                                    key={i + 1}
                                                                    value={
                                                                        i + 1
                                                                    }
                                                                >
                                                                    {i + 1}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-13 text-gray-700 dark:text-gray-200 md:text-16">
                                                        Pilih Tahun
                                                    </label>
                                                    <select
                                                        className="rounded border p-2 text-13 text-textgray dark:bg-gray-900 dark:text-white md:text-16"
                                                        value={tahun}
                                                        onChange={(e) =>
                                                            setTahun(
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            -- Pilih Tahun --
                                                        </option>
                                                        {Array.from(
                                                            { length: 20 },
                                                            (_, i) => {
                                                                const year =
                                                                    new Date().getFullYear() -
                                                                    i;
                                                                return (
                                                                    <option
                                                                        key={
                                                                            year
                                                                        }
                                                                        value={
                                                                            year
                                                                        }
                                                                    >
                                                                        {year}
                                                                    </option>
                                                                );
                                                            },
                                                        )}
                                                    </select>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <label className="text-13 text-gray-700 dark:text-gray-200 md:text-16">
                                                        Pilih Status
                                                    </label>
                                                    <select
                                                        className="rounded border p-2 text-13 text-textgray dark:bg-gray-900 dark:text-white md:text-16"
                                                        value={status}
                                                        onChange={(e) =>
                                                            setStatus(
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            -- Semua --
                                                        </option>
                                                        <option value="sudah bayar">
                                                            Sudah Bayar
                                                        </option>
                                                        <option value="belum bayar">
                                                            Belum Bayar
                                                        </option>
                                                        <option value="dibatalkan">
                                                            Dibatalkan
                                                        </option>
                                                    </select>
                                                </div>
                                                <button
                                                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                                                    onClick={handleExport}
                                                    disabled={loading}
                                                >
                                                    {loading
                                                        ? 'Mengekspor...'
                                                        : 'Export Excel'}
                                                </button>
                                            </div>
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
        </>
    );
}
