import { router } from '@inertiajs/react';
import { Button, Checkbox, Label } from 'flowbite-react';
import { useEffect, useState } from 'react';
import CardProduk from './CardProduk';
import ProdukModal from './ProdukModal';

export default function FilterProduk({ products, categories, types }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // ⏱ Trigger filter otomatis saat filter berubah
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            applyFilter();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [selectedCategories, selectedTypes, sortOrder]);

    const handleCategoryChange = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((cid) => cid !== id)
                : [...prev, id],
        );
    };

    const handleTypeChange = (id) => {
        setSelectedTypes((prev) =>
            prev.includes(id)
                ? prev.filter((tid) => tid !== id)
                : [...prev, id],
        );
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedTypes([]);
        setSortOrder('');
    };

    const applyFilter = () => {
        router.get(
            route('marketplace-index'),
            {
                kategori: selectedCategories,
                tipe: selectedTypes,
                sort: sortOrder,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    // Cek apakah ada filter yang aktif
    const hasActiveFilters =
        selectedCategories.length > 0 ||
        selectedTypes.length > 0 ||
        sortOrder !== '';

    return (
        <div className="flex flex-col gap-6 p-4 md:flex-row md:p-6 md:px-10">
            {/* Sidebar filter */}
            <div className="w-full space-y-6 md:w-[250px]">
                {/* Mobile filter toggle */}
                <div className="md:hidden">
                    <details className="rounded-lg border p-4">
                        <summary className="font-bold flex cursor-pointer items-center justify-between">
                            <span className="font-manropeMedium">
                                ▶ Filter Produk
                            </span>
                            {hasActiveFilters && (
                                <Button
                                    size="xs"
                                    color="failure"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resetFilters();
                                    }}
                                    className="ml-2 bg-secondary font-manropeMedium"
                                >
                                    Reset
                                </Button>
                            )}
                        </summary>
                        <div className="mt-4 space-y-6">
                            <div>
                                <h2 className="font-bold mb-2">Kategori</h2>
                                <div className="grid grid-cols-2 gap-2">
                                    {categories.map((kategori) => (
                                        <div
                                            key={kategori.id}
                                            className="flex items-center gap-2"
                                        >
                                            <Checkbox
                                                className="font-manropeMedium text-primary focus:outline-none focus:ring-0"
                                                id={`kategori-${kategori.id}`}
                                                checked={selectedCategories.includes(
                                                    kategori.id,
                                                )}
                                                onChange={() =>
                                                    handleCategoryChange(
                                                        kategori.id,
                                                    )
                                                }
                                            />
                                            <Label
                                                className="font-manropeMedium"
                                                htmlFor={`kategori-${kategori.id}`}
                                            >
                                                {kategori.kategori}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-bold mb-2">Tipe Produk</h2>
                                <div className="grid grid-cols-2 gap-2">
                                    {types.map((tipe) => (
                                        <div
                                            key={tipe.id}
                                            className="flex items-center gap-2"
                                        >
                                            <Checkbox
                                                className="font-manropeMedium text-primary focus:outline-none focus:ring-0"
                                                id={`tipe-${tipe.id}`}
                                                checked={selectedTypes.includes(
                                                    tipe.id,
                                                )}
                                                onChange={() =>
                                                    handleTypeChange(tipe.id)
                                                }
                                            />
                                            <Label
                                                className="font-manropeMedium"
                                                htmlFor={`tipe-${tipe.id}`}
                                            >
                                                {tipe.tipe_produk}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-bold mb-2 font-manropeMedium">
                                    Harga
                                </h2>
                                <div className="flex gap-2 font-manropeMedium">
                                    <Button
                                        size="xs"
                                        color={
                                            sortOrder === 'asc'
                                                ? 'primary'
                                                : 'light'
                                        }
                                        className={
                                            sortOrder === 'asc'
                                                ? 'bg-primary px-2 py-1 text-center text-white hover:bg-primaryemphasis'
                                                : 'px-2 py-1 text-center'
                                        }
                                        onClick={() => setSortOrder('asc')}
                                    >
                                        Terendah
                                    </Button>
                                    <Button
                                        size="xs"
                                        color={
                                            sortOrder === 'desc'
                                                ? 'primary'
                                                : 'light'
                                        }
                                        className={
                                            sortOrder === 'desc'
                                                ? 'bg-primary px-2 py-1 text-center text-white hover:bg-primaryemphasis'
                                                : 'px-2 py-1 text-center'
                                        }
                                        onClick={() => setSortOrder('desc')}
                                    >
                                        Tertinggi
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </details>
                </div>

                {/* Desktop filter */}
                <div className="hidden space-y-6 md:block">
                    <div className="mt-[-20px] flex items-center justify-between">
                        <h2 className="text-lg font-manropeSemiBold">Filter</h2>
                        {hasActiveFilters && (
                            <Button
                                size="xs"
                                color="failure"
                                onClick={resetFilters}
                                className="bg-secondary px-2 py-1 text-center font-manropeMedium text-white hover:bg-secondaryemphasis"
                            >
                                Reset Filter
                            </Button>
                        )}
                    </div>

                    <div className="font-manropeMedium">
                        <h2 className="font-bold mb-2">Kategori</h2>
                        <div className="grid grid-cols-1 gap-2">
                            {categories.map((kategori) => (
                                <div
                                    key={kategori.id}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox
                                        className="text-primary focus:outline-none focus:ring-0"
                                        id={`kategori-${kategori.id}`}
                                        checked={selectedCategories.includes(
                                            kategori.id,
                                        )}
                                        onChange={() =>
                                            handleCategoryChange(kategori.id)
                                        }
                                    />
                                    <Label htmlFor={`kategori-${kategori.id}`}>
                                        {kategori.kategori}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="font-manropeMedium">
                        <h2 className="font-bold mb-2">Tipe Produk</h2>
                        <div className="grid grid-cols-1 gap-2">
                            {types.map((tipe) => (
                                <div
                                    key={tipe.id}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox
                                        className="text-primary focus:outline-none focus:ring-0"
                                        id={`tipe-${tipe.id}`}
                                        checked={selectedTypes.includes(
                                            tipe.id,
                                        )}
                                        onChange={() =>
                                            handleTypeChange(tipe.id)
                                        }
                                    />
                                    <Label htmlFor={`tipe-${tipe.id}`}>
                                        {tipe.tipe_produk}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="font-manropeMedium">
                        <h2 className="font-bold mb-2">Harga</h2>
                        <div className="flex gap-2">
                            <Button
                                size="xs"
                                color={
                                    sortOrder === 'asc' ? 'primary' : 'light'
                                }
                                className={
                                    sortOrder === 'asc'
                                        ? 'bg-primary px-2 py-1 text-center text-white hover:bg-primaryemphasis'
                                        : 'px-2 py-1 text-center'
                                }
                                onClick={() => setSortOrder('asc')}
                            >
                                Terendah
                            </Button>
                            <Button
                                size="xs"
                                color={
                                    sortOrder === 'desc' ? 'primary' : 'light'
                                }
                                className={
                                    sortOrder === 'desc'
                                        ? 'bg-primary px-2 py-1 text-center text-white hover:bg-primaryemphasis'
                                        : 'px-2 py-1 text-center'
                                }
                                onClick={() => setSortOrder('desc')}
                            >
                                Tertinggi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Daftar Produk */}
            <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <CardProduk
                            key={product.id}
                            product={product}
                            onClick={() => handleProductClick(product)} // Perhatikan ini
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center">
                        Produk tidak ditemukan.
                    </p>
                )}
            </div>
            {/* Modal Detail Produk */}

            <ProdukModal
                product={selectedProduct}
                showModal={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}
