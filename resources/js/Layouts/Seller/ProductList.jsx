import { useState } from 'react';

import DeleteConfirmationModal from '@/Components/DeleteConfimationModal';
import { router } from '@inertiajs/react';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';

const ProductList = ({ products }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedProduct) {
            router.delete(route('produk-destroy', selectedProduct.id));
        }
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
                {products.data.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onDeleteClick={handleDeleteClick}
                        onProductClick={handleProductClick}
                    />
                ))}
            </div>

            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                message={
                    selectedProduct
                        ? `Apakah Anda yakin ingin menghapus produk "${selectedProduct.nama}"?`
                        : ''
                }
            />

            <ProductDetailModal
                product={selectedProduct}
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
};

export default ProductList;
