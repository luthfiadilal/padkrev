import ScrollToTop from '@/Components/shared/ScrollToTop';
import { usePage } from '@inertiajs/react';
import Header from '../../Layouts/Admin/Header/Header';
import SidebarLayout from '../../Layouts/Admin/Sidebar/Sidebar';

export default function AllTransaksi() {
    const { transaksiList, user } = usePage().props;

    console.log(transaksiList);

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
                                        <div className="container mt-10">
                                            <div className="rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
                                                <h2 className="font-bold mb-4 text-xl text-gray-800 dark:text-white">
                                                    Seluruh Transaksi Pembeli ke
                                                    Toko
                                                </h2>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-300">
                                                        <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                                            <tr>
                                                                <th className="px-4 py-3">
                                                                    Kode
                                                                    Transaksi
                                                                </th>
                                                                <th className="px-4 py-3">
                                                                    Pembeli
                                                                </th>
                                                                <th className="px-4 py-3">
                                                                    Produk
                                                                </th>
                                                                <th className="px-4 py-3">
                                                                    Toko
                                                                </th>
                                                                <th className="px-4 py-3">
                                                                    Qty
                                                                </th>
                                                                <th className="px-4 py-3">
                                                                    Total Harga
                                                                </th>
                                                                <th className="px-4 py-3">
                                                                    Status
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.entries(
                                                                transaksiList,
                                                            ).map(
                                                                ([
                                                                    kode,
                                                                    items,
                                                                ]) =>
                                                                    items.map(
                                                                        (
                                                                            item,
                                                                            idx,
                                                                        ) => (
                                                                            <tr
                                                                                key={`${kode}-${idx}`}
                                                                                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                                                            >
                                                                                <td className="px-4 py-3">
                                                                                    {
                                                                                        kode
                                                                                    }
                                                                                </td>
                                                                                <td className="px-4 py-3">
                                                                                    {
                                                                                        item
                                                                                            .transaksi
                                                                                            .pembeli
                                                                                            .user
                                                                                            .name
                                                                                    }
                                                                                </td>
                                                                                <td className="px-4 py-3">
                                                                                    {
                                                                                        item
                                                                                            .produk
                                                                                            .nama
                                                                                    }
                                                                                </td>
                                                                                <td className="px-4 py-3">
                                                                                    {item.penjual
                                                                                        ? item
                                                                                              .penjual
                                                                                              .nama_toko
                                                                                        : 'N/A'}
                                                                                </td>
                                                                                <td className="px-4 py-3">
                                                                                    {
                                                                                        item.quantity
                                                                                    }
                                                                                </td>
                                                                                <td className="px-4 py-3">
                                                                                    Rp
                                                                                    {parseInt(
                                                                                        item.harga_total,
                                                                                    ).toLocaleString(
                                                                                        'id-ID',
                                                                                    )}
                                                                                </td>
                                                                                <td className="px-4 py-3">
                                                                                    <span
                                                                                        className={`font-semibold rounded-full px-3 py-1 text-xs ${
                                                                                            item
                                                                                                .transaksi
                                                                                                .status ===
                                                                                            'sudah bayar'
                                                                                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
                                                                                        }`}
                                                                                    >
                                                                                        {
                                                                                            item
                                                                                                .transaksi
                                                                                                .status
                                                                                        }
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        ),
                                                                    ),
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
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
