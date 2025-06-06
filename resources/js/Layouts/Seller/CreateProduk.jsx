import { Icon } from '@iconify/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    Alert,
    Button,
    FileInput,
    Label,
    Select,
    Textarea,
    TextInput,
    ToggleSwitch,
} from 'flowbite-react';
import { useState } from 'react';

export default function CreateProduk({ kategoris, tipeProduks }) {
    const { flash } = usePage().props;
    const [showNewTipe, setShowNewTipe] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    const { data, setData, processing, errors, reset } = useForm({
        nama: '',
        kategori_id: '',
        tipe_produk_id: '',
        new_tipe_produk: '',
        deskripsi: '',
        foto: null,
        gallery: [],
        harga: '',
        harga_diskon: '',
        satuan: 'pcs',
        ukuran: '',
        warna: '',
        stok: '',
        status: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === 'gallery') {
                data.gallery.forEach((file) =>
                    formData.append('gallery[]', file),
                );
            } else if (key === 'foto' && data.foto) {
                formData.append('foto', data.foto);
            } else if (key === 'status') {
                // Ubah boolean ke 1 atau 0 agar validasi boolean Laravel menerima
                formData.append('status', data.status ? '1' : '0');
            } else if (data[key] !== null && data[key] !== '') {
                formData.append(key, data[key]);
            }
        });
        router.post(route('produk-store'), formData, {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                console.log(errors);
            },
        });
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('foto', file);
            setPreviews([{ file, preview: URL.createObjectURL(file) }]);
        }
    };

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        setData('gallery', [...data.gallery, ...files]);

        const newPreviews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setGalleryPreviews([...galleryPreviews, ...newPreviews]);
    };

    const removeGalleryImage = (index) => {
        const newGallery = [...data.gallery];
        newGallery.splice(index, 1);
        setData('gallery', newGallery);

        const newPreviews = [...galleryPreviews];
        URL.revokeObjectURL(newPreviews[index].preview);
        newPreviews.splice(index, 1);
        setGalleryPreviews(newPreviews);
    };

    return (
        <>
            <Head title="Tambah Produk Baru" />

            <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="font-bold mb-6 text-2xl text-gray-900 dark:text-white">
                    Tambah Produk Baru
                </h2>

                {flash?.error && (
                    <Alert color="failure" className="mb-6">
                        {flash.error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nama Produk */}
                    <div>
                        <Label htmlFor="nama" value="Nama Produk*" />
                        <TextInput
                            id="nama"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            placeholder="Contoh: Kopi Arabika Premium"
                            helperText={errors.nama}
                            color={errors.nama ? 'failure' : 'gray'}
                        />
                    </div>

                    {/* Kategori */}
                    <div>
                        <Label htmlFor="kategori_id" value="Kategori*" />
                        <Select
                            id="kategori_id"
                            value={data.kategori_id}
                            onChange={(e) =>
                                setData('kategori_id', e.target.value)
                            }
                            helperText={errors.kategori_id}
                            color={errors.kategori_id ? 'failure' : 'gray'}
                        >
                            <option className="text-textgray" value="">
                                Pilih Kategori
                            </option>
                            {kategoris.map((kategori) => (
                                <option
                                    className="text-textgray"
                                    key={kategori.id}
                                    value={kategori.id}
                                >
                                    {kategori.kategori}
                                </option>
                            ))}
                        </Select>
                    </div>

                    {/* Tipe Produk */}
                    <div>
                        <Label htmlFor="tipe_produk_id" value="Tipe Produk*" />
                        <Select
                            id="tipe_produk_id"
                            value={data.tipe_produk_id}
                            onChange={(e) => {
                                setData('tipe_produk_id', e.target.value);
                                setShowNewTipe(e.target.value === 'new');
                                if (e.target.value !== 'new') {
                                    setData('new_tipe_produk', '');
                                }
                            }}
                            helperText={errors.tipe_produk_id}
                            color={errors.tipe_produk_id ? 'failure' : 'gray'}
                        >
                            <option value="">Pilih Tipe Produk</option>
                            {tipeProduks.map((tipe) => (
                                <option key={tipe.id} value={tipe.id}>
                                    {tipe.tipe_produk}
                                </option>
                            ))}
                            <option value="new">+ Tambah Tipe Baru</option>
                        </Select>
                    </div>

                    {showNewTipe && (
                        <div>
                            <Label
                                htmlFor="new_tipe_produk"
                                value="Nama Tipe Produk Baru*"
                            />
                            <TextInput
                                id="new_tipe_produk"
                                value={data.new_tipe_produk}
                                onChange={(e) =>
                                    setData('new_tipe_produk', e.target.value)
                                }
                                placeholder="Contoh: Kemasan Premium"
                                helperText={errors.new_tipe_produk}
                                color={
                                    errors.new_tipe_produk ? 'failure' : 'gray'
                                }
                            />
                        </div>
                    )}

                    {/* Deskripsi */}
                    <div>
                        <Label htmlFor="deskripsi" value="Deskripsi Produk" />
                        <Textarea
                            id="deskripsi"
                            value={data.deskripsi}
                            onChange={(e) =>
                                setData('deskripsi', e.target.value)
                            }
                            rows={4}
                            placeholder="Deskripsikan produk Anda secara detail..."
                            helperText={errors.deskripsi}
                            color={errors.deskripsi ? 'failure' : 'gray'}
                        />
                    </div>

                    {/* Foto Utama */}
                    <div>
                        <Label htmlFor="foto" value="Foto Utama Produk" />
                        <FileInput
                            id="foto"
                            accept="image/*"
                            onChange={handleFotoChange}
                            helperText="Ukuran maksimal 2MB. Format: JPG, PNG"
                            icon={
                                <Icon
                                    icon="solar:camera-minimalistic-outline"
                                    className="h-5 w-5"
                                />
                            }
                        />
                        {previews.length > 0 && (
                            <div className="mt-2 flex space-x-2">
                                {previews.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="relative h-24 w-24"
                                    >
                                        <img
                                            src={item.preview}
                                            alt="Preview"
                                            className="h-full w-full rounded object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Gallery */}
                    <div>
                        <Label htmlFor="gallery" value="Gallery Produk" />
                        <FileInput
                            id="gallery"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryChange}
                            helperText="Maksimal 5 gambar. Ukuran masing-masing maksimal 2MB"
                            icon={
                                <Icon
                                    icon="solar:camera-minimalistic-outline"
                                    className="h-5 w-5"
                                />
                            }
                        />
                        {galleryPreviews.length > 0 && (
                            <div className="mt-2 grid grid-cols-3 gap-2">
                                {galleryPreviews.map((item, idx) => (
                                    <div key={idx} className="relative">
                                        <img
                                            src={item.preview}
                                            alt="Preview"
                                            className="h-32 w-full rounded object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeGalleryImage(idx)
                                            }
                                            className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                        >
                                            <Icon
                                                icon="solar:trash-bin-minimalistic-outline"
                                                className="h-4 w-4"
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Harga & Diskon */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="harga" value="Harga* (Rp)" />
                            <TextInput
                                id="harga"
                                type="number"
                                value={data.harga}
                                onChange={(e) =>
                                    setData('harga', e.target.value)
                                }
                                placeholder="Contoh: 50000"
                                helperText={errors.harga}
                                color={errors.harga ? 'failure' : 'gray'}
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="harga_diskon"
                                value="Harga Diskon (Rp)"
                            />
                            <TextInput
                                id="harga_diskon"
                                type="number"
                                value={data.harga_diskon}
                                onChange={(e) =>
                                    setData('harga_diskon', e.target.value)
                                }
                                placeholder="Isi jika ada diskon"
                                helperText={errors.harga_diskon}
                                color={errors.harga_diskon ? 'failure' : 'gray'}
                            />
                        </div>
                    </div>

                    {/* Satuan, Ukuran, Warna */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <Label htmlFor="satuan" value="Satuan*" />
                            <Select
                                id="satuan"
                                value={data.satuan}
                                onChange={(e) =>
                                    setData('satuan', e.target.value)
                                }
                                helperText={errors.satuan}
                                color={errors.satuan ? 'failure' : 'gray'}
                            >
                                <option value="pcs">Pcs</option>
                                <option value="kg">Kilogram</option>
                                <option value="gr">Gram</option>
                                <option value="ml">Mililiter</option>
                                <option value="l">Liter</option>
                                <option value="pack">Pack</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="ukuran" value="Ukuran (Opsional)" />
                            <TextInput
                                id="ukuran"
                                value={data.ukuran}
                                onChange={(e) =>
                                    setData('ukuran', e.target.value)
                                }
                                placeholder="Contoh: XL, 250ml"
                                helperText={errors.ukuran}
                                color={errors.ukuran ? 'failure' : 'gray'}
                            />
                        </div>
                        <div>
                            <Label htmlFor="warna" value="Warna (Opsional)" />
                            <TextInput
                                id="warna"
                                value={data.warna}
                                onChange={(e) =>
                                    setData('warna', e.target.value)
                                }
                                placeholder="Contoh: Merah, Hitam"
                                helperText={errors.warna}
                                color={errors.warna ? 'failure' : 'gray'}
                            />
                        </div>
                    </div>

                    {/* Stok & Status */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="stok" value="Stok (Opsional)" />
                            <TextInput
                                id="stok"
                                type="number"
                                value={data.stok}
                                onChange={(e) =>
                                    setData('stok', e.target.value)
                                }
                                placeholder="Kosongkan jika tidak terbatas"
                                helperText={errors.stok}
                                color={errors.stok ? 'failure' : 'gray'}
                            />
                        </div>
                        <div className="flex items-center">
                            <ToggleSwitch
                                checked={data.status}
                                label="Status Produk"
                                onChange={(e) => setData('status', e)}
                            />
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                {data.status ? 'Aktif' : 'Nonaktif'}
                            </span>
                        </div>
                    </div>

                    {/* Tombol Submit */}
                    <div className="flex justify-end space-x-3 pt-6">
                        <Button
                            href={route('produk-index')}
                            color="light"
                            disabled={processing}
                            className="hover:bg-lightprimary hover:text-primary"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            isProcessing={processing}
                            className="bg-secondary"
                            onClick={handleSubmit}
                        >
                            <Icon
                                icon="solar:plus-circle-line-duotone"
                                className="mr-2 h-5 w-5"
                            />
                            Tambah Produk
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
