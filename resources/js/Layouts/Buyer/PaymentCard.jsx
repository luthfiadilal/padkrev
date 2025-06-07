import { Icon } from '@iconify/react';
import { Card } from 'flowbite-react';

export default function PaymentCard({ item }) {
    const produk = item.produk;
    const kategori = produk?.kategori?.nama || 'Tanpa Kategori';
    const tipe = produk?.tipeProduk?.nama || 'Tanpa Tipe';

    const getImageUrl = (path) => {
        const filename = path.split('/').pop();
        return `/storage/produk/foto/${filename}`;
    };

    console.log(item);

    return (
        <Card className="flex flex-row gap-4 p-4">
            <img
                src={getImageUrl(produk?.foto)}
                alt={produk?.nama}
                className="h-24 w-24 rounded-lg object-cover"
            />
            <div className="flex-1">
                <h5 className="font-semibold text-lg">{produk?.nama}</h5>
                <p className="text-sm text-gray-500">
                    {kategori} • {tipe}
                </p>
                <div className="mt-1 text-sm">
                    <p>
                        Harga Satuan: Rp{' '}
                        {parseInt(item.produk.harga).toLocaleString()}
                    </p>
                    <p>
                        Harga Diskon: Rp{' '}
                        {parseInt(item.harga_satuan).toLocaleString()}
                    </p>

                    <p>Jumlah: {item.quantity}</p>
                    <p className="font-semibold text-primary">
                        Total: Rp {parseInt(item.harga_total).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="self-start text-green-600">
                <Icon icon="solar:cart-outline" className="text-3xl" />
            </div>
        </Card>
    );
}
