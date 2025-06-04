import CartItem from './CartItem';

export default function CartList({
    carts,
    selected,
    toggleSelect,
    onUpdateQty,
    onRemoveItem,
}) {
    return (
        <div>
            {carts.map((cart) => (
                <CartItem
                    key={cart.id}
                    cart={cart}
                    checked={selected.includes(cart.id)}
                    toggleSelect={() => toggleSelect(cart.id)}
                    onUpdateQty={onUpdateQty}
                    onRemoveItem={onRemoveItem}
                />
            ))}
        </div>
    );
}
