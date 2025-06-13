import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export default function MonthlySalesChart({ data }) {
    return (
        <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
            <h2 className="text-md font-semibold mb-3 text-gray-700 dark:text-white">
                Penjualan per Bulan
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bulan" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="jumlah"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
