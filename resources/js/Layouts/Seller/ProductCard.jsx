import { Icon } from '@iconify/react';
import { router } from '@inertiajs/react';
import { Badge, Button } from 'flowbite-react';

const ProductCard = ({ product }) => {
    const getImageUrl = (path) => {
        const filename = path.split('/').pop();
        return `/storage/produk/foto/${filename}`;
    };

    return (
        <div className="w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow">
            {/* Product Image */}
            <div className="relative aspect-square">
                <img
                    src={getImageUrl(product.foto)}
                    alt={product.nama}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                    }}
                />

                {/* Sale Badge */}
                {product.harga_diskon && (
                    <Badge color="red" className="absolute right-2 top-2">
                        {Math.round(
                            (1 - product.harga_diskon / product.harga) * 100,
                        )}
                        %
                    </Badge>
                )}
            </div>

            {/* Product Info */}
            <div className="p-3">
                {/* Category */}
                <Badge color="gray" className="mb-1">
                    {product.kategori.nama}
                </Badge>

                {/* Product Name */}
                <h3 className="font-medium mb-1 line-clamp-1 text-gray-900">
                    {product.nama}
                </h3>

                {/* Price */}
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

                {/* Product Specs */}
                <div className="mb-2 flex flex-wrap gap-x-2 gap-y-1 text-xs">
                    {product.ukuran && (
                        <span className="text-gray-600">{product.ukuran}</span>
                    )}
                    {product.warna && (
                        <span className="text-gray-600">{product.warna}</span>
                    )}
                    <span className="text-gray-600">Stok: {product.stok}</span>
                </div>
            </div>

            {/* Quick Actions - Now placed below card content */}
            <div className="flex justify-between px-3 pb-3">
                <Button
                    size="xs"
                    color="light"
                    className="text-gray-700 hover:bg-gray-50"
                    onClick={() =>
                        router.get(route('produk-create', product.id))
                    }
                >
                    <Icon icon="solar:pen-bold" className="mr-1" width={14} />
                    Edit
                </Button>
                <div className="flex gap-1">
                    <Button
                        size="xs"
                        color="light"
                        className="text-gray-700 hover:bg-gray-50"
                    >
                        <Icon icon="solar:eye-bold" width={14} />
                    </Button>
                    <Button
                        size="xs"
                        color="light"
                        className="text-gray-700 hover:bg-gray-50"
                    >
                        <Icon icon="solar:cart-plus-bold" width={14} />
                    </Button>
                    <Button
                        size="xs"
                        color="light"
                        className="text-gray-700 hover:bg-gray-50"
                    >
                        <Icon icon="solar:heart-bold" width={14} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
