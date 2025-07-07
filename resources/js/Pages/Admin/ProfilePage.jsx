import { Icon } from '@iconify/react';
import { router } from '@inertiajs/react';
import { Badge, Button, Card } from 'flowbite-react';

export default function ProfilePage({ user, roleData }) {
    const admin = {
        ...user,
        ...roleData,
        no_hp: roleData?.no_hp || user?.no_hp,
        alamat: roleData?.alamat || user?.alamat,
    };

    const goToDashboard = () => {
        router.get(route('admin.dashboard'));
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6 p-4">
            {/* Arrow Back */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center text-blue-600 hover:underline"
                >
                    <Icon
                        icon="solar:arrow-left-line-duotone"
                        className="mr-1 h-5 w-5"
                    />
                    Kembali
                </button>
            </div>

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
                                admin?.foto_profil
                                    ? `/storage/${admin.foto_profil}`
                                    : '/images/default-profile.png'
                            }
                            alt="Foto Admin"
                            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="font-bold text-2xl">{admin?.name}</h1>
                        <p className="text-blue-100">{admin?.email}</p>
                        <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                            <Button
                                outline
                                pill
                                size="xs"
                                gradientDuoTone="purpleToBlue"
                                href={route('profile.edit')}
                            >
                                <Icon icon="solar:pen-bold" className="mr-1" />
                                Edit Profil
                            </Button>
                            <Button
                                outline
                                pill
                                size="xs"
                                gradientDuoTone="greenToBlue"
                                onClick={goToDashboard}
                            >
                                <Icon icon="solar:home-bold" className="mr-1" />
                                Dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informasi Pribadi */}
            <Card>
                <h2 className="font-semibold mb-4 flex items-center gap-2 text-xl">
                    <Icon
                        icon="solar:user-id-bold"
                        className="text-indigo-500"
                    />
                    Informasi Admin
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
                            {admin?.no_hp || 'Belum diatur'}
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
                            {new Date(admin?.created_at).toLocaleDateString(
                                'id-ID',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                },
                            )}
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
                            {admin?.alamat || 'Belum menambahkan alamat'}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
