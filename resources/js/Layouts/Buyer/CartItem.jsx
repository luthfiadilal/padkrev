import { Icon } from '@iconify/react';
import { Button } from 'flowbite-react';

export default function CartItem({
    cart,
    checked,
    toggleSelect,
    onUpdateQty,
    onRemoveItem,
}) {
    const getImageUrl = (path) => {
        if (!path) return '/placeholder.jpg'; // fallback aman
        const filename = path.split('/').pop();
        return `/storage/produk/foto/${filename}`;
    };

    return (
        <div className="flex items-center gap-1 overflow-hidden border-b p-2 md:gap-3 md:px-4 md:py-4">
            <input
                className="rounded-[4px] checked:bg-primary focus:outline-none focus:ring-0 focus:ring-offset-0"
                type="checkbox"
                checked={checked}
                onChange={toggleSelect}
            />
            <img
                src={getImageUrl(cart.produk?.foto)}
                alt={cart.produk?.nama}
                className="mr-2 h-20 w-20 rounded object-cover"
                onError={(e) => {
                    e.target.src = '/placeholder.jpg'; // fallback ketika error load
                }}
            />
            <div className="flex-1">
                <div className="font-manropeReguler text-10 text-textgray md:text-16">
                    {cart.produk?.nama}
                </div>
                <div className="font-manropeReguler text-10 text-textgray md:text-16">
                    {cart.penjual?.nama_toko}
                </div>
                <div className="text-10 font-manropeSemiBold text-red-600 md:text-16">
                    {parseFloat(cart.harga_satuan).toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                    })}
                </div>
            </div>

            <div className="flex flex-col items-center p-0 md:flex-row md:gap-2">
                <div className="flex items-center text-10 md:gap-2 md:text-16">
                    <Button
                        className="flex h-8 w-8 items-center justify-center p-0 text-secondary"
                        onClick={() => onUpdateQty(cart.id, cart.quantity - 1)}
                    >
                        <Icon
                            icon="solar:minus-square-linear"
                            className="h-5 w-5 text-black"
                        />
                    </Button>

                    <span className="font-manropeSemiBold text-black">
                        {cart.quantity}
                    </span>

                    <Button
                        className="flex h-8 w-8 items-center justify-center p-0"
                        onClick={() => onUpdateQty(cart.id, cart.quantity + 1)}
                    >
                        <Icon
                            icon="solar:add-square-linear"
                            className="h-5 w-5 text-black"
                        />
                    </Button>
                </div>
                <div className="w-auto text-center text-10 font-manropeSemiBold text-red-600 md:text-right md:text-16">
                    {parseFloat(cart.harga_total).toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                    })}
                </div>
            </div>
            <Button
                className=""
                color="failure"
                size="xs"
                onClick={() => onRemoveItem(cart.id)}
            >
                <Icon
                    icon="solar:trash-bin-trash-bold"
                    className="h-5 w-5 text-secondary"
                />
            </Button>
        </div>
    );
}
