import { Icon } from '@iconify/react';
import { Card } from 'flowbite-react';

export default function PaymentCard({ item }) {
    const produk = item.produk;
    const kategori = produk?.kategori?.kategori || 'Tanpa Kategori';
    const tipe = produk?.tipe_produk?.tipe_produk || 'Tanpa Tipe';

    const getImageUrl = (path) => {
        const filename = path.split('/').pop();
        return `/storage/produk/foto/${filename}`;
    };

    console.log(item);

    return (
        <Card className="flex gap-4">
            <div className="flex w-full flex-col gap-4 md:flex-row">
                <img
                    src={getImageUrl(produk?.foto)}
                    alt={produk?.nama}
                    className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex w-full flex-wrap justify-between gap-3 px-3 text-textgray">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-20 font-manropeSemiBold">
                            {produk?.nama}
                        </h5>
                        <p className="text-16 font-manropeMedium text-textgray">
                            {kategori} • {tipe}
                        </p>
                        <div className="mt-1 flex flex-col gap-1 text-15">
                            <p className="font-manropeMedium">
                                Harga Satuan:
                                <span className="font-manropeSemiBold text-red-500">
                                    Rp{''}
                                    {parseInt(
                                        item.produk.harga,
                                    ).toLocaleString()}
                                </span>
                            </p>
                            <p className="font-manropeMedium">
                                Harga Diskon:
                                <span className="font-manropeSemiBold text-secondary">
                                    Rp{' '}
                                    {parseInt(
                                        item.harga_satuan,
                                    ).toLocaleString()}
                                </span>
                            </p>

                            <p>Jumlah: {item.quantity}</p>
                            <p className="">
                                Total:
                                <span className="font-manropeSemiBold text-primary">
                                    Rp{' '}
                                    {parseInt(
                                        item.harga_total,
                                    ).toLocaleString()}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <a
                            href={item.penjual?.whatsapp_link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-white"
                            title={`Chat dengan ${item.penjual?.nama_toko || 'Penjual'}`}
                        >
                            <Icon
                                icon="solar:chat-round-line-linear"
                                className="text-3xl"
                            />
                            <p className="text-14 font-manropeSemiBold">Chat</p>
                        </a>
                    </div>
                </div>
            </div>
        </Card>
    );
}
