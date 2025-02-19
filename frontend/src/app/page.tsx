'use client'
import { Login } from "@/components/Login";
import { Signup } from "@/components/Signup";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-b from-gray-50 to-gray-200 py-8">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Seller-Prod</h1>
        <p className="text-lg text-gray-600">A simple e-commerce platform</p>
      </div>
      <div className="flex-1 flex items-center justify-center py-8">
        {isLogin ?
          <Login
            setIsLogin={setIsLogin} />
          :
          <Signup
            setIsLogin={setIsLogin} />}
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
