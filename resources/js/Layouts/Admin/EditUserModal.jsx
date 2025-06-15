import Modal from '@/Components/Modal';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function EditUserModal({ user, show, onClose }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        role: '',
        // admin & buyer & seller common:
        no_hp: '',
        alamat: '',
        // khusus penjual:
        nama_toko: '',
    });

    useEffect(() => {
        if (show && user?.id) {
            const roleData =
                user.role === 'seller'
                    ? user.penjual || {}
                    : user.role === 'buyer'
                      ? user.pembeli || {}
                      : user.admin || {};

            setForm({
                name: user.name || '',
                email: user.email || '',
                role: user.role || '',
                no_hp: roleData.no_hp || '',
                alamat: roleData.alamat || '',
                nama_toko: roleData.nama_toko || '',
            });
        }
    }, [show, user?.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route('admin.users.update', user.id), form, {
            onSuccess: () => onClose(),
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="font-bold mb-4 text-xl">Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <label className="font-medium mb-2 block text-sm">
                        Nama
                    </label>
                    <input
                        name="name"
                        value={form['name'] || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />

                    <label className="font-medium mb-2 mt-4 block text-sm">
                        Email
                    </label>
                    <input
                        name="email"
                        value={form['email'] || ''}
                        type="email"
                        onChange={handleChange}
                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />

                    {/* Common Fields */}
                    <label className="font-medium mb-2 mt-4 block text-sm">
                        No HP
                    </label>
                    <input
                        name="no_hp"
                        value={form.no_hp || ''}
                        type="number"
                        onChange={handleChange}
                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />

                    <label className="font-medium mb-2 mt-4 block text-sm">
                        Alamat
                    </label>
                    <input
                        name="alamat"
                        value={form.alamat || ''}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />

                    {/* Conditional by Role */}
                    {form.role === 'seller' && (
                        <>
                            <label className="font-medium mb-2 mt-4 block text-sm">
                                Nama Toko
                            </label>
                            <input
                                name="nama_toko"
                                value={form.nama_toko || ''}
                                onChange={handleChange}
                                type="text"
                                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </>
                    )}

                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            className="rounded bg-gray-300 px-4 py-2 text-textgray"
                            onClick={onClose}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-primary px-4 py-2 text-white"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
