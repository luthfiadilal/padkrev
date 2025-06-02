import { router, useForm } from '@inertiajs/react';
import { Button, Card, FileInput, Label, TextInput } from 'flowbite-react';

export default function Edit({ user, roleData }) {
    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        nama_toko: roleData?.nama_toko || '',
        deskripsi: roleData?.deskripsi || '',
        whatsapp_link: roleData?.whatsapp_link || '',
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
            // Anda juga bisa menambahkan onError jika diperlukan
        });
    };

    return (
        <div className="mx-auto mt-10 max-w-4xl px-4">
            <Card className="shadow-md">
                <h2 className="font-bold mb-4 text-2xl text-gray-700">
                    Profil Pengguna
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                    {/* Data umum */}
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

                    {/* Role-based fields */}
                    {user.role === 'seller' && (
                        <>
                            <div>
                                <Label htmlFor="nama_toko">Nama Toko</Label>
                                <TextInput
                                    id="nama_toko"
                                    value={data.nama_toko}
                                    onChange={(e) =>
                                        setData('nama_toko', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="deskripsi">Deskripsi</Label>
                                <TextInput
                                    id="deskripsi"
                                    value={data.deskripsi}
                                    onChange={(e) =>
                                        setData('deskripsi', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="whatsapp_link">
                                    WhatsApp Link
                                </Label>
                                <TextInput
                                    id="whatsapp_link"
                                    value={data.whatsapp_link}
                                    onChange={(e) =>
                                        setData('whatsapp_link', e.target.value)
                                    }
                                />
                            </div>
                        </>
                    )}

                    {(user.role === 'seller' ||
                        user.role === 'buyer' ||
                        user.role === 'admin') && (
                        <>
                            <div>
                                <Label htmlFor="no_hp">No HP</Label>
                                <TextInput
                                    id="no_hp"
                                    value={data.no_hp}
                                    onChange={(e) =>
                                        setData('no_hp', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="alamat">Alamat</Label>
                                <TextInput
                                    id="alamat"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData('alamat', e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="foto_profil">Foto Profil</Label>
                                <FileInput
                                    id="foto_profil"
                                    onChange={(e) =>
                                        setData(
                                            'foto_profil',
                                            e.target.files[0],
                                        )
                                    }
                                />
                            </div>
                        </>
                    )}

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
