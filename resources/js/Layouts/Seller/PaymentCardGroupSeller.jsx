import PaymentCard from './PaymentCardSeller';

export default function PaymentCardGroupSeller({ transaksi, status }) {
    const toko = transaksi.items[0]?.penjual;

    const getImageProfile = (path) => {
        if (!path) return '/placeholder.jpg'; // <-- tambahkan fallback image di sini

        if (path.startsWith('foto_profil/')) {
            return `/storage/${path}`;
        }

        return path;
    };

    return (
        <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
                <img
                    src={
                        toko?.foto_profil
                            ? getImageProfile(toko.foto_profil)
                            : '/placeholder.jpg'
                    }
                    alt={toko?.nama_toko}
                    className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                    <h4 className="font-bold text-lg">{toko?.nama_toko}</h4>
                    <p className="text-sm text-gray-500">
                        Kode Transaksi: {transaksi.kode_transaksi}
                    </p>
                </div>
            </div>
            <div className="space-y-4">
                {transaksi.items.map((item) => (
                    <PaymentCard
                        key={item.id}
                        item={item}
                        status={status}
                        transaksi={transaksi}
                    />
                ))}
            </div>
        </div>
    );
}
