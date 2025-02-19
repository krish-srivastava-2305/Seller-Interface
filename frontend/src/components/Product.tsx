import { useRouter } from 'next/navigation';
import React from 'react';

interface ProductProps {
    id: string;
    name: string;
    price: string;
    description: string;
}

const Product: React.FC<ProductProps> = ({ name, price, description, id }) => {
    const router = useRouter()
    return (
        <div
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => router.push(`/dashboard/${id}`)}
        >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{name}</h2>
            <p className="text-blue-600 font-medium mb-3">₹{price}</p>
            <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>
    );
};

interface ProductListProps {
    products: ProductProps[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 w-full max-w-7xl mx-auto">
            {products.map((product, index) => (
                <Product
                    key={index}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    id={product.id}
                />
            ))}
        </div>
    );
};

export default ProductList;