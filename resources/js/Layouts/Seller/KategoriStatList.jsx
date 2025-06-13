import { Icon } from '@iconify/react';

export default function KategoriStatList({ data }) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(data).map(([kategori, jumlah], i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl bg-blue-50 p-4 shadow dark:bg-blue-900"
                >
                    <div className="text-2xl text-blue-600 dark:text-white">
                        <Icon icon="solar:tag-bold" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">{kategori}</div>
                        <div className="font-semibold text-lg text-gray-700 dark:text-white">
                            {jumlah}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
