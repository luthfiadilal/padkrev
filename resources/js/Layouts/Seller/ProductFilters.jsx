import { router } from '@inertiajs/react';
import { useState } from 'react';

const ProductFilters = ({
    categories = [],
    productTypes = [],
    filters = {},
}) => {
    const [sortBy, setSortBy] = useState(filters.sortBy || 'latest');
    const [categoryId, setCategoryId] = useState(filters.categoryId || '');
    const [productTypeId, setProductTypeId] = useState(
        filters.productTypeId || '',
    );

    const applyFilters = () => {
        router.get(
            route('produk-index'),
            {
                sortBy,
                categoryId: categoryId || null,
                productTypeId: productTypeId || null,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const resetFilters = () => {
        setSortBy('latest');
        setCategoryId('');
        setProductTypeId('');
        router.get(
            route('produk-index'),
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <div className="mb-6 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {/* Filter Kategori */}
                <div>
                    <label className="font-medium mb-1 block text-sm text-gray-700 dark:text-gray-300">
                        Kategori
                    </label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Semua Kategori</option>
                        {Array.isArray(categories) &&
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.nama}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Filter Tipe Produk */}
                <div>
                    <label className="font-medium mb-1 block text-sm text-gray-700 dark:text-gray-300">
                        Tipe Produk
                    </label>
                    <select
                        value={productTypeId}
                        onChange={(e) => setProductTypeId(e.target.value)}
                        className="w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Semua Tipe</option>
                        {Array.isArray(productTypes) &&
                            productTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.nama}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Filter Sorting */}
                <div>
                    <label className="font-medium mb-1 block text-sm text-gray-700 dark:text-gray-300">
                        Urutkan
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="latest">Terbaru</option>
                        <option value="price_asc">Harga Terendah</option>
                        <option value="price_desc">Harga Tertinggi</option>
                        <option value="name_asc">Nama (A-Z)</option>
                        <option value="name_desc">Nama (Z-A)</option>
                    </select>
                </div>

                {/* Tombol Aksi */}
                <div className="flex items-end space-x-2">
                    <button
                        onClick={applyFilters}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                        Terapkan Filter
                    </button>
                    <button
                        onClick={resetFilters}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilters;
