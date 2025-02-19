'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
            name: title,
            description,
            price
        }, {
            withCredentials: true
        })
        if (res.status === 201) router.push("/dashboard")
    };

    return (
        <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-b from-gray-50 to-gray-200 py-8">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Product</h1>
            </div>
            <div className="w-96 p-8 bg-white rounded-lg shadow-xl">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out"
                    >
                        Create Product
                    </button>
                </form>
            </div>
            <div className="mt-8">
                <Link
                    href="https://linkedin.com/in/krish-sriv"
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-150 flex items-center gap-1"
                >
                    Created by @krish
                </Link>
            </div>
        </div>
    );
}