import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SellerLoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        role: 'seller',
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        post('/seller/login', {
            onSuccess: () => toast.success('Welcome back 👋'),
            onError: () => toast.error('Invalid login credentials'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <Toaster richColors position="top-right" />

            <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-xl bg-white">

                {/* LEFT - VISUAL */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-10 flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">
                            Sell smarter, not harder 🚀
                        </h1>
                        <p className="text-indigo-200">
                            Manage products, track sales, and grow your business effortlessly.
                        </p>
                    </div>

                    <div className="text-sm text-indigo-200">
                        Trusted by 10,000+ sellers worldwide
                    </div>
                </div>

                {/* RIGHT - FORM */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Seller Login
                    </h2>
                    <p className="text-gray-500 mb-6 text-sm">
                        Access your seller dashboard
                    </p>

                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* EMAIL */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full rounded-xl border px-4 py-3 pr-12 focus:ring-2 focus:ring-indigo-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3 text-gray-500"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>

                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* SUBMIT */}
                        <button
                            disabled={processing}
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* FOOTER */}
                    <p className="mt-6 text-sm text-center text-gray-600">
                        New seller?{' '}
                        <button
                            onClick={() => router.get('/seller/register')}
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            Create account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SellerLoginPage;