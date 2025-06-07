import { router } from '@inertiajs/react';
import React from 'react';
import { toast } from 'react-toastify';
import CartFooter from './CartFooter';
import CartSellerGroup from './CartSellerGroup';

export default function CartPage({ carts, onUpdateQty, onRemoveItem }) {
    const [selected, setSelected] = React.useState([]);

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((sid) => sid !== id)
                : [...prev, id],
        );
    };

    const allSelected = carts.length > 0 && selected.length === carts.length;

    // Helper untuk mengelompokkan carts berdasarkan penjual_id
    const groupByPenjual = (items) => {
        return items.reduce((acc, item) => {
            const key = item.penjual_id;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    };

    const groupedCarts = groupByPenjual(carts);

    const handleCheckout = (selectedIds) => {
        if (selectedIds.length === 0) {
            alert('Pilih produk yang ingin dibayar!');
            return;
        }

        router.post(
            route('checkout'), // Pastikan route checkout sudah ditambahkan
            { cart_ids: selectedIds },
            {
                onStart: () => console.log('Processing...'),
                onSuccess: () => {
                    toast.success(
                        'Berhasil Checkout, silakan lakukan pembayaran',
                        {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        },
                    );
                },
                onError: (errors) => {
                    console.error(errors);
                    alert('Gagal checkout!');
                },
            },
        );
    };

    return (
        <div className="mx-auto max-w-7xl p-4">
            <h2 className="font-bold mb-4 text-xl">Keranjang Belanja</h2>
            <div className="rounded bg-white">
                <div className="flex items-center border-b p-4">
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={() =>
                            allSelected
                                ? setSelected([])
                                : setSelected(carts.map((c) => c.id))
                        }
                        className="mr-2 rounded-[4px] checked:bg-primary focus:outline-none focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="font-semibold">Produk</span>
                </div>

                {/* <CartList
                    carts={carts}
                    selected={selected}
                    toggleSelect={toggleSelect}
                    onUpdateQty={onUpdateQty}
                    onRemoveItem={onRemoveItem}
                /> */}

                {Object.entries(groupedCarts).map(([penjualId, cartsGroup]) => (
                    <CartSellerGroup
                        key={penjualId}
                        carts={cartsGroup}
                        selected={selected}
                        toggleSelect={toggleSelect}
                        onUpdateQty={onUpdateQty}
                        onRemoveItem={onRemoveItem}
                    />
                ))}

                <CartFooter
                    carts={carts}
                    selected={selected}
                    toggleSelectAll={() =>
                        setSelected(allSelected ? [] : carts.map((c) => c.id))
                    }
                    onCheckout={handleCheckout}
                    // onRemoveSelected={() => {
                    //     // Misalnya kamu ingin menghapus semua selected item
                    //     selected.forEach((id) => onRemoveItem(id));
                    //     setSelected([]); // Reset setelah hapus
                    // }}
                />
            </div>
        </div>
    );
}
