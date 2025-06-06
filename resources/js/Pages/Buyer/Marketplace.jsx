import DynamicHead from '@/Components/DynamicHead';
import Banner from '@/Layouts/Buyer/Banner';
import FilterProduk from '@/Layouts/Buyer/FilterProduk';
import Navbar from '@/Layouts/Buyer/Navbar';
import { usePage } from '@inertiajs/react';

export default function Marketplace() {
    const { products, categories, types, user, cartCount } = usePage().props;
    return (
        <div>
            <DynamicHead>
                <title>Marketplace</title>
            </DynamicHead>
            <Navbar user={user} cartCount={cartCount} />
            <Banner />
            <FilterProduk
                products={products}
                categories={categories}
                types={types}
            />
        </div>
    );
}
