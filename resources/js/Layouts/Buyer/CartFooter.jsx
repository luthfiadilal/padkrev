import { Button, Checkbox } from 'flowbite-react';

export default function CartFooter({
    carts,
    selected,
    toggleSelectAll,
    onRemoveSelected,
}) {
    const selectedItems = carts.filter((item) => selected.includes(item.id));
    const total = selectedItems.reduce(
        (sum, item) => sum + Number(item.harga_total || 0),
        0,
    );

    const allSelected = carts.length > 0 && selected.length === carts.length;
    console.log('Selected Items:', selectedItems);

    return (
        <div className="mt-6 flex items-center justify-between border-t px-6 py-4">
            <div className="flex items-center gap-3">
                <Checkbox
                    className="mr-2 rounded-[4px] border-textgray checked:bg-primary focus:outline-none focus:ring-0 focus:ring-offset-0"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                />
                <span>Pilih Semua</span>
                <button
                    className="text-sm text-red-500"
                    onClick={onRemoveSelected}
                >
                    Hapus
                </button>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-600">
                    Total ({selected.length} produk):
                </p>
                <p className="font-bold text-xl text-red-500">
                    Rp {Number(total).toLocaleString()}
                </p>
            </div>
            <Button
                className="bg-secondary px-6 py-1 hover:bg-secondaryemphasis"
                disabled={selected.length === 0}
            >
                Bayar
            </Button>
        </div>
    );
}
