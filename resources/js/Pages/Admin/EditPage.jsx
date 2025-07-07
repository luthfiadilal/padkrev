import { Icon } from '@iconify/react';
import { router, useForm } from '@inertiajs/react';
import { Button, Card, FileInput, Label, TextInput } from 'flowbite-react';

export default function Edit({ user, roleData }) {
    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        no_hp: roleData?.no_hp || '',
        alamat: roleData?.alamat || '',
        foto_profil: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.update'), {
            onSuccess: () => {
                router.visit(route('profile.index'));
            },
        });
    };

    return (
        <div className="mx-auto mt-10 max-w-3xl px-4">
            {/* Tombol Kembali */}
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

            <Card className="shadow-md">
                <h2 className="font-bold mb-4 text-2xl text-gray-700">
                    Edit Profil Admin
                </h2>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                    <div>
                        <Label htmlFor="name">Nama</Label>
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="no_hp">No HP</Label>
                        <TextInput
                            id="no_hp"
                            value={data.no_hp}
                            onChange={(e) => setData('no_hp', e.target.value)}
                        />
                        {errors.no_hp && (
                            <p className="text-sm text-red-500">
                                {errors.no_hp}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="alamat">Alamat</Label>
                        <TextInput
                            id="alamat"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                        />
                        {errors.alamat && (
                            <p className="text-sm text-red-500">
                                {errors.alamat}
                            </p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <Label htmlFor="foto_profil">Foto Profil</Label>
                        <FileInput
                            id="foto_profil"
                            onChange={(e) =>
                                setData('foto_profil', e.target.files[0])
                            }
                        />
                        {errors.foto_profil && (
                            <p className="text-sm text-red-500">
                                {errors.foto_profil}
                            </p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <Button
                            type="submit"
                            isProcessing={processing}
                            className="w-full bg-secondary"
                        >
                            Simpan
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
