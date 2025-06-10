import { Icon } from '@iconify/react';
import { router } from '@inertiajs/react';
import { Card } from 'flowbite-react';

export default function PaymentCardSeller({ item, status, transaksi }) {
    const produk = item.produk;
    const kategori = produk?.kategori?.kategori || 'Tanpa Kategori';
    const tipe = produk?.tipe_produk?.tipe_produk || 'Tanpa Tipe';

    const getImageUrl = (path) => {
        const filename = path.split('/').pop();
        return `/storage/produk/foto/${filename}`;
    };

    console.log(transaksi);

    // Fungsi umum untuk update status
    const handleUpdateStatus = (newStatus, confirmMessage) => {
        if (confirm(confirmMessage)) {
            router.post(
                route('transaksi.update-status', {
                    transaksi: item.transaksi_id,
                }),
                { status: newStatus },
                {
                    onSuccess: () => {
                        alert('Status transaksi berhasil diperbarui');
                    },
                    onError: (errors) => {
                        console.error('Error:', errors);
                        alert('Gagal mengubah status transaksi');
                    },
                },
            );
        }
    };

    const handleToCancel = () => {
        handleUpdateStatus(
            'dibatalkan',
            'Yakin ingin membatalkan transaksi ini?',
        );
    };

    const handleMarkAsPaid = () => {
        handleUpdateStatus(
            'sudah bayar',
            'Yakin menandai transaksi ini sebagai sudah dibayar?',
        );
    };

    // const handleMarkAsUnpaid = () => {
    //     handleUpdateStatus(
    //         'belum bayar',
    //         'Yakin mengubah status transaksi ini menjadi belum bayar?',
    //     );
    // };

    // Function untuk mendapatkan status badge
    const getStatusBadge = (currentStatus) => {
        const statusConfig = {
            'belum bayar': {
                color: 'bg-yellow-100 text-yellow-800',
                text: 'Belum Bayar',
            },
            'sudah bayar': {
                color: 'bg-green-100 text-green-800',
                text: 'Sudah Bayar',
            },
            dibatalkan: {
                color: 'bg-red-100 text-red-800',
                text: 'Dibatalkan',
            },
        };

        const config =
            statusConfig[currentStatus] || statusConfig['belum bayar'];

        return (
            <span
                className={`font-medium rounded-full px-2 py-1 text-xs ${config.color}`}
            >
                {config.text}
            </span>
        );
    };

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
                        <div className="flex items-center gap-3">
                            <h5 className="text-20 font-manropeSemiBold">
                                {produk?.nama}
                            </h5>
                            {getStatusBadge(transaksi?.status)}
                        </div>

                        <p className="text-16 font-manropeMedium text-textgray">
                            {kategori} • {tipe}
                        </p>

                        {/* Info Transaksi */}
                        <div className="text-sm text-gray-600">
                            {transaksi?.pembeli && (
                                <p>
                                    Pembeli:{' '}
                                    <span className="font-medium">
                                        {transaksi.pembeli.user.name}
                                    </span>
                                </p>
                            )}
                        </div>

                        <div className="mt-1 flex flex-col gap-1 text-15">
                            <p className="font-manropeMedium">
                                Harga Satuan:
                                <span className="font-manropeSemiBold text-red-500">
                                    Rp{' '}
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

                    <div className="flex items-end gap-2">
                        {/* Tombol Chat (selalu ada) */}
                        {/* <a
                            href={item.penjual?.whatsapp_link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-primary-dark flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-white"
                            title={`Chat dengan ${item.penjual?.nama_toko || 'Penjual'}`}
                        >
                            <Icon
                                icon="solar:chat-round-line-linear"
                                className="text-xl"
                            />
                            <p className="text-14 font-manropeSemiBold">Chat</p>
                        </a> */}

                        {/* Button berdasarkan status */}
                        {status === 'belumBayar' && (
                            <>
                                <button
                                    onClick={handleToCancel}
                                    className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-textgray shadow shadow-[0_6px_2px_rgba(0,0,0,0.08)] hover:bg-gray-50"
                                    title="Batalkan Transaksi"
                                >
                                    <Icon
                                        icon="mdi:cancel"
                                        className="text-xl text-red-500"
                                    />
                                    <p className="text-14 font-manropeSemiBold">
                                        Batalkan
                                    </p>
                                </button>
                                <button
                                    onClick={handleMarkAsPaid}
                                    className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-white hover:bg-green-600"
                                    title="Tandai sebagai sudah dibayar"
                                >
                                    <Icon
                                        icon="mdi:check-circle"
                                        className="text-xl"
                                    />
                                    <p className="text-14 font-manropeSemiBold">
                                        Telah Dibayar
                                    </p>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
