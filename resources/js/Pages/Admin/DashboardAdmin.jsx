import ScrollToTop from '@/Components/shared/ScrollToTop';
import StatCard from '@/Layouts/Seller/StatCard';
import { usePage } from '@inertiajs/react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import Header from '../../Layouts/Admin/Header/Header';
import SidebarLayout from '../../Layouts/Admin/Sidebar/Sidebar';

export default function DashboardAdmin() {
    const {
        user,
        totalProduk,
        totalPenjual,
        totalPembeli,
        monthlyRegistrations,
        totalRegistrations,
    } = usePage().props;

    // Format angka untuk display
    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num;
    };

    return (
        <>
            <div className="flex min-h-screen w-full dark:bg-darkgray">
                <SidebarLayout />
                <div className="page-wrapper flex w-full">
                    <div className="page-wrapper-sub flex w-full flex-col dark:bg-darkgray">
                        <Header user={user} />

                        <div
                            className={`h-full rounded-bb bg-lightgray dark:bg-dark`}
                        >
                            <div className={`w-full`}>
                                <ScrollToTop>
                                    <div className="container py-30">
                                        {/* Stat Cards */}
                                        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                                            <StatCard
                                                icon="solar:box-bold"
                                                label="Total Produk"
                                                value={totalProduk}
                                                bg="bg-white"
                                            />
                                            <StatCard
                                                icon="solar:shop-bold-duotone"
                                                label="Total Penjual"
                                                value={totalPenjual}
                                                bg="bg-white"
                                            />
                                            <StatCard
                                                icon="solar:user-id-bold"
                                                label="Total Pembeli"
                                                value={totalPembeli}
                                                bg="bg-white"
                                            />
                                        </div>

                                        {/* Chart Section */}
                                        <div className="rounded-lg bg-white p-6 shadow">
                                            <div className="mb-4 flex items-center justify-between">
                                                <h2 className="font-semibold text-xl">
                                                    Registrasi User
                                                </h2>
                                                <div className="font-bold text-2xl text-blue-600">
                                                    {formatNumber(
                                                        totalRegistrations,
                                                    )}
                                                </div>
                                            </div>

                                            <div className="h-80">
                                                <ResponsiveContainer
                                                    width="100%"
                                                    height="100%"
                                                >
                                                    <AreaChart
                                                        data={
                                                            monthlyRegistrations
                                                        }
                                                        margin={{
                                                            top: 10,
                                                            right: 30,
                                                            left: 0,
                                                            bottom: 0,
                                                        }}
                                                    >
                                                        <defs>
                                                            <linearGradient
                                                                id="colorTotal"
                                                                x1="0"
                                                                y1="0"
                                                                x2="0"
                                                                y2="1"
                                                            >
                                                                <stop
                                                                    offset="5%"
                                                                    stopColor="#3b82f6"
                                                                    stopOpacity={
                                                                        0.8
                                                                    }
                                                                />
                                                                <stop
                                                                    offset="95%"
                                                                    stopColor="#3b82f6"
                                                                    stopOpacity={
                                                                        0
                                                                    }
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid
                                                            strokeDasharray="3 3"
                                                            vertical={false}
                                                        />
                                                        <XAxis
                                                            dataKey="month"
                                                            axisLine={false}
                                                            tickLine={false}
                                                        />
                                                        <YAxis
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tickFormatter={
                                                                formatNumber
                                                            }
                                                        />
                                                        <Tooltip
                                                            formatter={(
                                                                value,
                                                            ) => [
                                                                value,
                                                                'Jumlah',
                                                            ]}
                                                            labelFormatter={(
                                                                label,
                                                            ) =>
                                                                `Bulan: ${label}`
                                                            }
                                                        />
                                                        <Area
                                                            type="monotone"
                                                            dataKey="total"
                                                            stroke="#3b82f6"
                                                            fillOpacity={1}
                                                            fill="url(#colorTotal)"
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
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
