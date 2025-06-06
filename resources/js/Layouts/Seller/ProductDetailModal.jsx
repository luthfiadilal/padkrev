import Modal from '@/Components/Modal';
import { Badge } from 'flowbite-react';

const ProductDetailModal = ({ product, show, onClose }) => {
    if (!product) return null;

    const getImageUrl = (path) => {
        const filename = path.split('/').pop();
        return `/storage/produk/foto/${filename}`;
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                    {/* Gambar Produk */}
                    <div className="w-full md:w-1/2">
                        <div className="aspect-square overflow-hidden rounded-xl border">
                            <img
                                src={getImageUrl(product.foto)}
                                alt={product.nama}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/placeholder.jpg';
                                }}
                            />
                        </div>
                    </div>

                    {/* Detail Produk */}
                    <div className="flex w-full flex-col justify-between md:w-1/2">
                        <div>
                            <h2 className="font-semibold mb-2 text-2xl text-gray-900">
                                {product.nama}
                            </h2>
                            <p className="mb-4 whitespace-pre-line text-sm text-gray-600">
                                {product.deskripsi || 'Tidak ada deskripsi.'}
                            </p>

                            <div className="mb-4">
                                {product.harga_diskon ? (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-bold text-xl text-red-600">
                                            Rp{' '}
                                            {new Intl.NumberFormat(
                                                'id-ID',
                                            ).format(product.harga_diskon)}
                                        </span>
                                        <span className="text-sm text-gray-400 line-through">
                                            Rp{' '}
                                            {new Intl.NumberFormat(
                                                'id-ID',
                                            ).format(product.harga)}
                                        </span>
                                        <Badge
                                            color="red"
                                            className="rounded-full px-2 text-xs"
                                        >
                                            -
                                            {Math.round(
                                                (1 -
                                                    product.harga_diskon /
                                                        product.harga) *
                                                    100,
                                            )}
                                            %
                                        </Badge>
                                    </div>
                                ) : (
                                    <span className="font-bold text-xl text-gray-900">
                                        Rp{' '}
                                        {new Intl.NumberFormat('id-ID').format(
                                            product.harga,
                                        )}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 text-sm text-gray-700">
                                {product.ukuran && (
                                    <span>Ukuran: {product.ukuran}</span>
                                )}
                                {product.warna && (
                                    <span>Warna: {product.warna}</span>
                                )}
                                <span>Stok: {product.stok ?? 'Tersedia'}</span>
                                <span>
                                    Status:{' '}
                                    {product.status ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductDetailModal;
