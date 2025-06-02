import DynamicHead from '@/Components/DynamicHead';
import Banner from '@/Layouts/Buyer/Banner';
import FilterProduk from '@/Layouts/Buyer/FilterProduk';
import Navbar from '@/Layouts/Buyer/Navbar';
import { usePage } from '@inertiajs/react';

export default function Marketplace() {
    const { products, categories, types } = usePage().props;
    return (
        <div>
            <DynamicHead>
                <title>Marketplace</title>
            </DynamicHead>
            <Navbar />
            <Banner />
            <FilterProduk
                products={products}
                categories={categories}
                types={types}
            />
        </div>
    );
}
