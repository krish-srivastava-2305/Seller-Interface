'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ProductProps {
    id: string;
    name: string;
    price: string;
    description: string;
}

const SingleProduct: React.FC<ProductProps> = ({ id, name, price, description }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
                withCredentials: true
            });
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-2/3 mx-auto mt-12 bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{name}</h2>
            <p className="text-xl font-medium text-blue-600 mb-6">₹{price}</p>
            <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>

            <div className="flex gap-4">
                <button
                    onClick={() => router.push(`/dashboard/update/${id}`)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 px-6 rounded-lg transition duration-200"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default SingleProduct;