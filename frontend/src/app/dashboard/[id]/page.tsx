"use client"
import SingleProduct from "@/components/SingleProduct";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
}

export default function Product() {
    const params = useParams()
    const [productId, setProductId] = useState(params?.id)
    const [product, setProduct] = useState<Product>()
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
                    withCredentials: true
                })
                setProduct(res.data[0].product)
                console.log(product)
            } catch (error) {
                console.error(error)
            }
        }
        getProduct()
    }, [productId])
    return (
        <div className="flex justify-center items-center h-screen w-full">
            {product ? <SingleProduct name={product.name} price={product.price} description={product.description} id={product.id} /> : <div>Loading...</div>}
        </div>
    )
}