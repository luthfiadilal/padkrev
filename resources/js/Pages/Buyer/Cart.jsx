import DynamicHead from '@/Components/DynamicHead';
import CartPage from '@/Layouts/Buyer/CartPage';
import Navbar from '@/Layouts/Buyer/Navbar';

export default function Cart({ carts }) {
    const handleQtyChange = () => {
        // Tambahkan validasi jika newQty < 1
        // Kirim ke server via Inertia.post/put
    };

    const handleRemove = () => {
        // Kirim ke server untuk hapus item cart
    };

    return (
        <div>
            <DynamicHead>
                <title>Keranjang</title>
            </DynamicHead>
            <Navbar />
            <CartPage
                carts={carts}
                onUpdateQty={handleQtyChange}
                onRemoveItem={handleRemove}
            />
        </div>
    );
}
