import { Icon } from '@iconify/react'; // ← Tambah import ini
import { Badge, Button } from 'flowbite-react';

const CardProduk = ({ product, onClick }) => {
    const getImageUrl = (path) => {
        const filename = path.split('/').pop();
        return `/storage/produk/foto/${filename}`;
    };

    const handleClick = (e) => {
        e.stopPropagation(); // Mencegah event bubbling
        onClick?.(); // Panggil onClick prop jika ada
    };

    const handleTambahKeranjang = () => {
        alert(`Tambahkan ke keranjang: ${product.nama}`);
    };

    const handleChat = () => {
        // Format pesan yang lebih baik
        const productName = product.nama;
        const productPrice = new Intl.NumberFormat('id-ID').format(
            product.harga,
        );

        // Buat pesan yang lebih profesional
        const message = `Halo, saya tertarik dengan produk:

        Nama Produk: ${productName}
        Harga: Rp ${productPrice}

        Apakah produk ini masih tersedia?`;

        // Cek kontak penjual
        if (product.penjual?.whatsapp_link) {
            window.open(
                `${product.penjual.whatsapp_link}?text=${encodeURIComponent(message)}`,
            );
        } else if (product.penjual?.no_hp) {
            const phone = product.penjual.no_hp.startsWith('0')
                ? '62' + product.penjual.no_hp.substring(1)
                : product.penjual.no_hp;
            window.open(
                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
            );
        } else {
            alert('Kontak penjual tidak tersedia');
        }
    };

    return (
        <div
            onClick={handleClick}
            className="flex h-[300px] w-full flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow"
        >
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
                    className="col-span-1 flex items-center justify-center gap-1 p-2 text-textgray"
                >
                    <Icon icon="solar:cart-large-4-linear" width={18} />
                </Button>
                <Button
                    size="sm"
                    color="gray"
                    className="col-span-1 flex items-center justify-center gap-1 p-2"
                    onClick={handleChat}
                >
                    <Icon icon="solar:chat-round-line-linear" width={18} />
                </Button>
                <Button
                    size="sm"
                    className="col-span-2 flex items-center justify-center bg-secondary hover:bg-secondaryemphasis"
                >
                    Beli
                </Button>
            </div>
        </div>
    );
};

export default CardProduk;
