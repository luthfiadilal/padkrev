import DynamicHead from '@/Components/DynamicHead';
import Modal from '@/Components/Modal'; // asumsi path modal kamu
import CartPage from '@/Layouts/Buyer/CartPage';
import Navbar from '@/Layouts/Buyer/Navbar';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function Cart({ user, carts, cartCount }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleQtyChange = (id, newQty) => {
        router.put(
            route('cart.update', id),
            { quantity: newQty },
            {
                preserveScroll: true,
                onSuccess: () => {},
                onError: (errors) => {
                    console.error(errors);
                    alert('Gagal memperbarui jumlah!');
                },
            },
        );
    };

    const handleRemove = (id) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!itemToDelete) return;

        router.delete(route('cart.destroy', itemToDelete), {
            onSuccess: () => {
                setShowDeleteModal(false);
                setItemToDelete(null);
            },
        });
    };

    return (
        <div>
            <DynamicHead>
                <title>Keranjang</title>
            </DynamicHead>
            <Navbar user={user} cartCount={cartCount} />
            <CartPage
                carts={carts}
                onUpdateQty={handleQtyChange}
                onRemoveItem={handleRemove}
            />

            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <div className="p-6">
                    <h2 className="font-bold text-lg text-gray-900">
                        Hapus Produk
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Apakah kamu yakin ingin menghapus produk ini dari
                        keranjang?
                    </p>

                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="font-medium rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                        >
                            Batal
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="font-medium rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
