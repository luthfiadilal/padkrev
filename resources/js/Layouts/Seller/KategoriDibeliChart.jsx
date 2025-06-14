import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

const COLORS = ['#3d64af', '#f4a261', '#ffc658', '#f87171', '#34d399'];

export default function KategoriDibeliChart({ data }) {
    return (
        <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
            <h2 className="text-md font-semibold mb-3 text-gray-700 dark:text-white">
                Kategori Produk Terbeli
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="jumlah"
                        nameKey="kategori"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
