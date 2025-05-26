import { Card } from 'flowbite-react';

export default function SellerProfile({ roleData }) {
    const seller = roleData;

    return (
        <div className="mx-auto max-w-5xl space-y-8 p-6">
            {/* Banner Toko */}
            <div className="relative h-48 w-full rounded-2xl bg-gradient-to-r from-purple-400 to-indigo-500 shadow-md">
                <div className="absolute -bottom-12 left-6 flex items-center gap-4">
                    <img
                        src={
                            seller?.foto_profil
                                ? `/storage/${seller.foto_profil}`
                                : '/images/default-profile.png'
                        }
                        alt="Foto Toko"
                        className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                    <div className="text-white">
                        <h1 className="font-bold text-2xl">
                            {seller?.nama_toko ?? 'Nama Toko'}
                        </h1>
                        <p className="text-sm text-textgray">
                            {seller?.alamat ?? 'Alamat toko tidak tersedia'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Spacer untuk foto toko */}
            <div className="h-16" />

            {/* Info Toko */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Stat Dummy */}

                <Card className="col-span-1 text-center">
                    <h2 className="font-semibold text-xl text-gray-800">120</h2>
                    <p className="text-sm text-gray-500">Produk Dijual</p>
                </Card>
                <Card className="col-span-1 text-center">
                    <h2 className="font-semibold text-xl text-gray-800">
                        Padalarang
                    </h2>
                    <p className="text-sm text-gray-500">Lokasi</p>
                </Card>
            </div>

            {/* Detail Profil */}
            <Card className="rounded-xl shadow-md">
                <div className="space-y-4 text-gray-700">
                    <div>
                        <p className="font-semibold text-sm text-gray-500">
                            Deskripsi Toko
                        </p>
                        <p>
                            {seller?.deskripsi ?? 'Belum ada deskripsi toko.'}
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <p className="font-semibold text-sm text-gray-500">
                                Nomor HP
                            </p>
                            <p>{seller?.no_hp ?? '-'}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-500">
                                Alamat
                            </p>
                            <p>{seller?.alamat ?? '-'}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="font-semibold text-sm text-gray-500">
                                WhatsApp
                            </p>
                            <a
                                href={seller?.whatsapp_link ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {seller?.whatsapp_link ?? 'Tidak tersedia'}
                            </a>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
