'use client'
import ProductList from "@/components/Product";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
                withCredentials: true
            });
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
                    withCredentials: true
                });
                setProducts(res.data[0].products);
            } catch (error) {
                console.error(error)
            }
        }
        getProducts();
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
                        <p className="text-gray-600 mt-2">Manage your product inventory</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push('/dashboard/create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition duration-200"
                        >
                            Add Product
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <ProductList products={products} />
            </div>
            <footer className="py-8 text-center border-t border-gray-200">
                <Link
                    href="https://linkedin.com/in/krish-sriv"
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-150 text-sm"
                >
                    Created by @krish
                </Link>
            </footer>
        </div>
    );
}