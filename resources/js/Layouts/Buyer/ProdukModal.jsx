import { Icon } from '@iconify/react';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../../Components/Modal';

const ProdukModal = ({ product, showModal, onClose }) => {
    if (!product) return null;

    const getImageUrl = (path, isGallery = false) => {
        if (!path) return '/placeholder.jpg';
        const filename = path.split('/').pop();
        return isGallery
            ? `/storage/produk/gallery/${filename}`
            : `/storage/produk/foto/${filename}`;
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentImage, setCurrentImage] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [quantity, setQuantity] = useState(1);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (product) {
            // eslint-disable-next-line no-unused-vars
            const images = [product.foto, ...(product.gallery || [])];
            setCurrentImage(product.foto); // default tampilan pertama
        }
    }, [product]);

    const handleChat = () => {
        const message = `Halo, saya tertarik dengan produk:

Nama Produk: ${product.nama}
Harga: Rp ${new Intl.NumberFormat('id-ID').format(product.harga)}

Apakah produk ini masih tersedia?`;

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

    const handleTambahKeranjang = async () => {
        try {
            const response = await axios.post('/buyer/cart', {
                produk_id: product.id,
                quantity: 1,
            });
            toast.success(
                response.data.message || 'Berhasil menambahkan ke keranjang',
            );
        } catch (error) {
            console.error('Gagal tambah keranjang:', error);
            toast.error(
                error.response?.data?.message ||
                    'Terjadi kesalahan saat menambahkan ke keranjang',
            );
        }
    };

    return (
        <Modal show={showModal} onClose={onClose} maxWidth="2xl">
            <div className="p-6">
                {/* Header */}

                {/* Body */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Gallery Produk */}
                    <div>
                        {/* Gambar utama */}
                        <div className="mb-4 h-80 overflow-hidden rounded-lg bg-gray-100">
                            <img
                                src={getImageUrl(currentImage)}
                                alt={product.nama}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/placeholder.jpg';
                                }}
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {/* Thumbnail utama */}
                            <button
                                onClick={() => setCurrentImage(product.foto)}
                                className={`h-16 w-16 shrink-0 overflow-hidden rounded border ${
                                    currentImage === product.foto
                                        ? 'border-primary'
                                        : 'border-gray-200'
                                }`}
                            >
                                <img
                                    src={getImageUrl(product.foto)}
                                    className="h-full w-full object-cover"
                                    alt="Foto Utama"
                                    onError={(e) => {
                                        e.target.src = '/placeholder.jpg';
                                    }}
                                />
                            </button>

                            {/* Thumbnail gallery (jika ada) */}
                            {(product?.gallery || []).map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImage(img)}
                                    className={`h-16 w-16 shrink-0 overflow-hidden rounded border ${
                                        currentImage === img
                                            ? 'border-primary'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <img
                                        src={getImageUrl(img, true)}
                                        className="h-full w-full object-cover"
                                        alt={`Gallery ${idx + 1}`}
                                        onError={(e) => {
                                            e.target.src = '/placeholder.jpg';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Detail Produk */}
                    <div>
                        <div className="mb-4 border-b-0 pb-0">
                            <h3 className="text-xl font-manropeBold text-gray-900">
                                {product.nama}
                            </h3>
                        </div>
                        {/* Harga */}
                        <div className="mb-4">
                            {product.harga_diskon ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-manropeBold text-secondary">
                                        Rp{' '}
                                        {new Intl.NumberFormat('id-ID').format(
                                            product.harga_diskon,
                                        )}
                                    </span>
                                    <span className="text-sm font-manropeMedium text-textgray line-through">
                                        Rp{' '}
                                        {new Intl.NumberFormat('id-ID').format(
                                            product.harga,
                                        )}
                                    </span>
                                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-manropeMedium text-red-800">
                                        {Math.round(
                                            (1 -
                                                product.harga_diskon /
                                                    product.harga) *
                                                100,
                                        )}
                                        % OFF
                                    </span>
                                </div>
                            ) : (
                                <span className="font-bold text-2xl text-gray-900">
                                    Rp{' '}
                                    {new Intl.NumberFormat('id-ID').format(
                                        product.harga,
                                    )}
                                </span>
                            )}
                        </div>

                        {/* Info Penjual */}
                        <div className="mb-6 rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200">
                                    {product?.penjual?.foto_profil && (
                                        <img
                                            src={`/storage/${product.penjual.foto_profil}`}
                                            className="h-full w-full rounded-full object-cover"
                                            alt="Penjual"
                                        />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-manropeSemiBold">
                                        {product.penjual?.nama_toko || 'Toko'}
                                    </h4>
                                    <p className="font-manropeReguler text-sm text-gray-500">
                                        {product.penjual?.alamat ||
                                            'Alamat tidak tersedia'}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <Button
                                    size="sm"
                                    color="gray"
                                    onClick={handleChat}
                                    className="flex items-center gap-1"
                                >
                                    <Icon
                                        icon="solar:chat-round-line-linear"
                                        width={16}
                                    />
                                    Chat Penjual
                                </Button>
                                <Button
                                    size="sm"
                                    color="gray"
                                    className="flex items-center gap-1"
                                >
                                    <Icon
                                        icon="solar:shop-2-outline"
                                        width={16}
                                    />
                                    Kunjungi Toko
                                </Button>
                            </div>
                        </div>

                        {/* Detail Produk */}
                        <div className="mb-6 space-y-4">
                            <div>
                                <h4 className="font-medium mb-2 text-gray-900">
                                    Deskripsi Produk
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {product.deskripsi || 'Tidak ada deskripsi'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {product.ukuran && (
                                    <div>
                                        <h4 className="font-medium mb-1 text-sm text-gray-500">
                                            Ukuran
                                        </h4>
                                        <p className="text-sm text-gray-900">
                                            {product.ukuran}
                                        </p>
                                    </div>
                                )}
                                {product.warna && (
                                    <div>
                                        <h4 className="font-medium mb-1 text-sm text-gray-500">
                                            Warna
                                        </h4>
                                        <p className="text-sm text-gray-900">
                                            {product.warna}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-medium mb-1 text-sm text-gray-500">
                                        Stok
                                    </h4>
                                    <p className="text-sm text-gray-900">
                                        {product.stok} {product.satuan}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-1 text-sm text-gray-500">
                                        Kategori
                                    </h4>
                                    <p className="text-sm text-gray-900">
                                        {product.kategori?.kategori}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Aksi */}
                        <div className="mb-4 flex items-center justify-end gap-3">
                            <div className="flex items-center rounded-lg border">
                                <button
                                    onClick={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                                >
                                    <Icon icon="mdi:minus" />
                                </button>
                                <span className="w-10 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                                >
                                    <Icon icon="mdi:plus" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-3">
                            <Button
                                onClick={handleTambahKeranjang}
                                className="flex flex-1 items-center justify-center border-2 border-secondary bg-white text-secondary"
                            >
                                <Icon
                                    icon="solar:cart-large-4-linear"
                                    className="mr-2 inline-block text-lg"
                                />
                                Tambah
                            </Button>
                            <Button
                                onClick={handleTambahKeranjang}
                                className="flex flex-1 items-center justify-center bg-secondary text-white hover:bg-secondaryemphasis"
                            >
                                <Icon
                                    icon="solar:wallet-money-outline"
                                    className="mr-2 inline-block text-lg"
                                />
                                Beli
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProdukModal;
