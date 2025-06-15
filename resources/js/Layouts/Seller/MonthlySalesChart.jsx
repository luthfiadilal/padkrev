import { Icon } from '@iconify/react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export default function MonthlySalesChart({ data }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 dark:bg-gray-800">
            <div className="mb-4 flex items-center gap-2">
                <Icon
                    icon="solar:chart-linear-bold"
                    className="text-xl text-blue-500"
                />
                <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                    Statistik Penjualan Bulanan
                </h2>
            </div>
            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data}>
                    <defs>
                        <linearGradient
                            id="colorLine"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#3b82f6"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="100%"
                                stopColor="#3b82f6"
                                stopOpacity={0.2}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.3} />
                    <XAxis
                        dataKey="bulan"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            borderRadius: '0.5rem',
                            border: 'none',
                            color: 'white',
                        }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#a1a1aa' }}
                    />
                    <Legend verticalAlign="top" height={36} />

                    {/* Background Line - lebih besar dan transparan */}
                    <Line
                        type="monotone"
                        dataKey="jumlah"
                        stroke="#3b82f6"
                        strokeWidth={8}
                        strokeOpacity={0.15}
                        dot={false}
                        isAnimationActive={false}
                    />

                    {/* Garis utama */}
                    <Line
                        type="monotone"
                        dataKey="jumlah"
                        stroke="url(#colorLine)"
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            stroke: '#3b82f6',
                            strokeWidth: 2,
                            fill: 'white',
                        }}
                        name="Jumlah Terjual"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
