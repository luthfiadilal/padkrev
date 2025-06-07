import { Button, Checkbox } from 'flowbite-react';

export default function CartFooter({
    carts,
    selected,
    toggleSelectAll,
    onCheckout,
}) {
    const selectedItems = carts.filter((item) => selected.includes(item.id));
    const total = selectedItems.reduce(
        (sum, item) => sum + Number(item.harga_total || 0),
        0,
    );

    const allSelected = carts.length > 0 && selected.length === carts.length;

    return (
        <div className="mt-6 flex items-center justify-between border-t px-6 py-4">
            <div className="flex items-center gap-3">
                <Checkbox
                    className="mr-2 rounded-[4px] border-textgray checked:bg-primary focus:outline-none focus:ring-0 focus:ring-offset-0"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                />
                <span className="text-sm text-textgray">Pilih Semua</span>
            </div>
            <div className="flex items-center justify-end gap-4">
                <div className="flex flex-col">
                    <p className="text-right text-sm text-textgray">
                        Total ({selected.length} produk):
                    </p>
                    <p className="font-bold text-right text-xl text-red-500">
                        Rp {Number(total).toLocaleString()}
                    </p>
                </div>
                <Button
                    className="bg-secondary px-6 py-1 hover:bg-secondaryemphasis"
                    disabled={selected.length === 0}
                    onClick={() => onCheckout(selected)}
                >
                    Bayar
                </Button>
            </div>
        </div>
    );
}
