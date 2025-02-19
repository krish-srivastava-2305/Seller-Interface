import axios from "axios";
import { useState } from "react";

interface LoginProps {
    setIsLogin: (value: boolean) => void;
    router: any;
}

export const Login: React.FC<LoginProps> = ({ setIsLogin, router }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
                email,
                password
            }, {
                withCredentials: true
            })
            if (res.status == 200)
                router.push("/dashboard")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="w-96 p-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="space-y-4">
                    <button
                        type="submit"
                        onClick={handleLogin}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out"
                    >
                        Login
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => setIsLogin(false)}
                            className="text-blue-600 hover:text-blue-500 font-medium"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}