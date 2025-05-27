import { Icon } from '@iconify/react';
import { useForm } from '@inertiajs/react';

export default function KategoriForm({ kategories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        kategori: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('kategori-store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-10">
            <h2 className="font-bold mb-6 text-2xl text-gray-800">
                Manajemen Kategori
            </h2>
            {/* Form Tambah Kategori */}
            <form
                onSubmit={handleSubmit}
                className="mb-10 space-y-4 rounded-lg bg-white p-6 shadow"
            >
                <div>
                    <label className="font-medium block text-sm text-gray-700">
                        Nama Kategori
                    </label>
                    <input
                        type="text"
                        value={data.kategori}
                        onChange={(e) => setData('kategori', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-textgray shadow-sm"
                    />
                    {errors.kategori && (
                        <div className="mt-1 text-sm text-red-600">
                            {errors.kategories}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded bg-primary px-4 py-2 text-white hover:bg-primaryemphasis"
                >
                    Tambah Kategori
                </button>
            </form>

            {/* Daftar Kategori */}
            <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="font-semibold mb-6 flex items-center gap-2 text-lg text-gray-800">
                    <Icon
                        icon="solar:tag-bold"
                        className="text-xl text-secondary"
                    />
                    Daftar Kategori
                </h3>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {kategories.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm transition duration-200 hover:bg-blue-50"
                        >
                            <span className="font-medium text-gray-800">
                                {item.kategori}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
