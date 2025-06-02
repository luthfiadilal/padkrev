import { Icon } from '@iconify/react';
import { Badge, Button, Card } from 'flowbite-react';

export default function ProfilePage({ user, roleData }) {
    // Gabungkan data user umum dengan data spesifik pembeli
    const buyer = {
        ...user,
        ...roleData,
        // Jika ada field yang namanya berbeda antara user dan roleData
        no_hp: roleData?.no_hp || user?.no_hp,
        alamat: roleData?.alamat || user?.alamat,
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6 p-4">
            {/* Profile Header */}
            <div className="relative rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 p-6 shadow-lg">
                <div className="flex flex-col items-center gap-4 text-center text-white sm:flex-row sm:text-left">
                    <div className="relative">
                        <Badge
                            color="success"
                            placement="top-right"
                            className="h-5 w-5 -translate-y-1 translate-x-1"
                        >
                            <span className="sr-only">Online</span>
                        </Badge>
                        <img
                            src={
                                buyer?.foto_profil
                                    ? `/storage/${buyer.foto_profil}`
                                    : '/images/default-profile.png'
                            }
                            alt="Foto Toko"
                            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="font-bold text-2xl">
                            {buyer?.name || 'Nama Pembeli'}
                        </h1>
                        <p className="text-blue-100">
                            {buyer?.email || 'email@example.com'}
                        </p>
                        <div className="mt-2 flex justify-center gap-2 sm:justify-start">
                            <Button
                                outline
                                pill
                                size="xs"
                                gradientDuoTone="purpleToBlue"
                            >
                                <Icon icon="solar:pen-bold" className="mr-1" />
                                Edit Profil
                            </Button>
                            <Button
                                outline
                                pill
                                size="xs"
                                gradientDuoTone="cyanToBlue"
                            >
                                <Icon
                                    icon="solar:settings-bold"
                                    className="mr-1"
                                />
                                Pengaturan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Icon
                            icon="solar:cart-large-2-bold"
                            className="text-blue-500"
                            width={20}
                        />
                        <h3 className="font-semibold text-lg text-gray-700">
                            {buyer?.jumlah_pesanan_aktif || 0}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-500">Pesanan Aktif</p>
                </Card>

                <Card className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Icon
                            icon="solar:star-bold"
                            className="text-yellow-400"
                            width={20}
                        />
                        <h3 className="font-semibold text-lg text-gray-700">
                            {buyer?.rating_pembeli?.toFixed(1) || '0.0'}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-500">Rating Pembeli</p>
                </Card>

                <Card className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Icon
                            icon="solar:heart-bold"
                            className="text-red-500"
                            width={20}
                        />
                        <h3 className="font-semibold text-lg text-gray-700">
                            {buyer?.jumlah_wishlist || 0}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-500">Wishlist</p>
                </Card>
            </div>

            {/* Personal Information */}
            <Card>
                <h2 className="font-semibold mb-4 flex items-center gap-2 text-xl">
                    <Icon
                        icon="solar:user-id-bold"
                        className="text-indigo-500"
                    />
                    Informasi Pribadi
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <p className="font-medium text-sm text-gray-500">
                            Nomor Telepon
                        </p>
                        <p className="flex items-center gap-2">
                            <Icon
                                icon="solar:phone-bold"
                                width={16}
                                className="text-gray-400"
                            />
                            {buyer?.no_hp || 'Belum diatur'}
                        </p>
                    </div>

                    <div>
                        <p className="font-medium text-sm text-gray-500">
                            Bergabung Sejak
                        </p>
                        <p className="flex items-center gap-2">
                            <Icon
                                icon="solar:calendar-bold"
                                width={16}
                                className="text-gray-400"
                            />
                            {new Date(buyer?.created_at).toLocaleDateString(
                                'id-ID',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                },
                            ) || 'Jan 2023'}
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="font-medium text-sm text-gray-500">
                            Alamat
                        </p>
                        <p className="flex items-start gap-2">
                            <Icon
                                icon="solar:map-point-bold"
                                width={16}
                                className="mt-0.5 text-gray-400"
                            />
                            {buyer?.alamat || 'Belum menambahkan alamat'}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Account Security */}
            <Card>
                <h2 className="font-semibold mb-4 flex items-center gap-2 text-xl">
                    <Icon
                        icon="solar:shield-keyhole-bold"
                        className="text-green-500"
                    />
                    Keamanan Akun
                </h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Email Terverifikasi</p>
                            <p className="text-sm text-gray-500">
                                Status verifikasi email
                            </p>
                        </div>
                        <Badge
                            color={
                                buyer?.email_verified_at ? 'success' : 'failure'
                            }
                            icon={() => (
                                <Icon
                                    icon={
                                        buyer?.email_verified_at
                                            ? 'solar:check-circle-bold'
                                            : 'solar:close-circle-bold'
                                    }
                                />
                            )}
                        >
                            {buyer?.email_verified_at
                                ? 'Terverifikasi'
                                : 'Belum Verifikasi'}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Autentikasi 2 Faktor</p>
                            <p className="text-sm text-gray-500">
                                Tingkatkan keamanan akun
                            </p>
                        </div>
                        <Button
                            size="xs"
                            gradientDuoTone={
                                buyer?.two_factor_enabled
                                    ? 'greenToBlue'
                                    : 'pinkToOrange'
                            }
                            pill
                        >
                            {buyer?.two_factor_enabled ? 'Aktif' : 'Nonaktif'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
