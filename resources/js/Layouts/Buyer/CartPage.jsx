import React from 'react';
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

    return (
        <div className="mx-auto max-w-7xl p-4">
            <h2 className="font-bold mb-4 text-xl">Keranjang Belanja</h2>
            <div className="rounded bg-white shadow">
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

                <CartSellerGroup
                    carts={carts}
                    selected={selected}
                    toggleSelect={toggleSelect}
                    onUpdateQty={onUpdateQty}
                    onRemoveItem={onRemoveItem}
                />

                <CartFooter
                    carts={carts}
                    selected={selected}
                    toggleSelectAll={() =>
                        setSelected(allSelected ? [] : carts.map((c) => c.id))
                    }
                    onRemoveSelected={() => {
                        // Misalnya kamu ingin menghapus semua selected item
                        selected.forEach((id) => onRemoveItem(id));
                        setSelected([]); // Reset setelah hapus
                    }}
                />
            </div>
        </div>
    );
}
