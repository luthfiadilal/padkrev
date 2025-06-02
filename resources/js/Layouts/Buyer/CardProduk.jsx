import { Icon } from '@iconify/react'; // ← Tambah import ini
import { Badge, Button } from 'flowbite-react';

const CardProduk = ({ product }) => {
    const getImageUrl = (path) => {
        const filename = path.split('/').pop();
        return `/storage/produk/foto/${filename}`;
    };

    const handleTambahKeranjang = () => {
        alert(`Tambahkan ke keranjang: ${product.nama}`);
    };

    const handleBeliSekarang = () => {
        alert(`Beli sekarang: ${product.nama}`);
    };

    return (
        <div className="flex h-[300px] w-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow">
            {/* Gambar Produk */}
            <div className="relative h-[50%]">
                <img
                    src={getImageUrl(product.foto)}
                    alt={product.nama}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                    }}
                />
                {product.harga_diskon && (
                    <Badge
                        color="red"
                        className="absolute right-3 top-2 rounded-full text-textgray"
                    >
                        {Math.round(
                            (1 - product.harga_diskon / product.harga) * 100,
                        )}
                        %
                    </Badge>
                )}
            </div>

            {/* Info Produk */}
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
                    <span>Stok: {product.stok}</span>
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="grid grid-cols-4 gap-2 p-3 pt-0">
                <Button
                    size="sm"
                    color="gray"
                    onClick={handleTambahKeranjang}
                    className="col-span-1 flex items-center justify-center gap-1 p-2"
                >
                    <Icon icon="solar:cart-outline" width={18} />
                </Button>
                <Button
                    size="sm"
                    className="col-span-3 flex items-center justify-center bg-secondary hover:bg-orange-600"
                    onClick={handleBeliSekarang}
                >
                    Beli
                </Button>
            </div>
        </div>
    );
};

export default CardProduk;
