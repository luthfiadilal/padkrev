import { Icon } from '@iconify/react';
import { router } from '@inertiajs/react';
import { Badge, Button } from 'flowbite-react';

const ProductCard = ({
    product,
    onDeleteClick,
    onProductClick,
    isTerlaris = false,
}) => {
    const getImageUrl = (path) => {
        const filename = path.split('/').pop();
        return `/storage/produk/foto/${filename}`;
    };

    const handleClick = (e) => {
        e.stopPropagation(); // Mencegah event bubbling
        onProductClick?.(product); // Panggil onClick prop jika ada
    };

    return (
        <div className="flex h-[300px] w-full flex-col overflow-hidden rounded-[18px] bg-white shadow-sm transition-all duration-300 hover:shadow">
            {/* Bagian 1: Gambar Produk */}
            <div className="relative h-[46%] cursor-pointer">
                <img
                    src={getImageUrl(product.foto)}
                    alt={product.nama}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                    }}
                    onClick={handleClick}
                />

                {isTerlaris && (
                    <div className="font-semibold absolute left-2 top-2 flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 px-3 py-1 text-xs text-white shadow-md ring-2 ring-white/80">
                        <Icon
                            icon="solar:fire-bold-duotone"
                            width={24}
                            height={24}
                            className="animate-pulse text-red-300"
                        />
                        <p className="animate-pulse text-sm">Terlaris</p>
                    </div>
                )}
                {product.harga_diskon && (
                    <Badge
                        color="red"
                        className="absolute right-2 top-2 rounded-[12px]"
                    >
                        {Math.round(
                            (1 - product.harga_diskon / product.harga) * 100,
                        )}
                        %
                    </Badge>
                )}
            </div>

            {/* Bagian 2: Info Produk */}
            <div className="flex-grow overflow-y-auto p-3">
                <h3 className="font-medium mb-1 line-clamp-1 text-gray-900">
                    {product.nama}
                </h3>
                <div className="mb-2">
                    {product.harga_diskon ? (
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-red-600">
                                Rp
                                {new Intl.NumberFormat('id-ID').format(
                                    product.harga_diskon,
                                )}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                                Rp
                                {new Intl.NumberFormat('id-ID').format(
                                    product.harga,
                                )}
                            </span>
                        </div>
                    ) : (
                        <span className="font-bold text-gray-900">
                            Rp
                            {new Intl.NumberFormat('id-ID').format(
                                product.harga,
                            )}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-600">
                    {product.ukuran && <span>{product.ukuran}</span>}
                    <span>Stok: {product.stok ?? 'Tersedia'}</span>
                </div>
            </div>

            {/* Bagian 3: Action Buttons */}
            <div className="p-3">
                <div className="flex justify-between">
                    <Button
                        size="xs"
                        color="light"
                        className="text-gray-700 hover:bg-gray-50"
                        onClick={() =>
                            router.get(route('produk-edit', product.id))
                        }
                    >
                        <Icon
                            icon="solar:pen-bold"
                            className="mr-1"
                            width={14}
                        />
                        Edit
                    </Button>
                    <Button
                        size="xs"
                        color="light"
                        className="text-gray-700 hover:bg-gray-50"
                        onClick={() => onDeleteClick(product)}
                    >
                        <Icon
                            icon="solar:trash-bin-trash-bold"
                            className="mr-1"
                            width={14}
                        />
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
