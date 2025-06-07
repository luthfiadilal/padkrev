import PaymentCard from './PaymentCard';

export default function PaymentList({ items, status }) {
    if (items.length === 0) {
        return <p className="text-gray-500">Tidak ada transaksi {status}.</p>;
    }

    return (
        <div className="mt-4 space-y-4">
            {items.map((item) => (
                <PaymentCard key={item.id} item={item} />
            ))}
        </div>
    );
}
