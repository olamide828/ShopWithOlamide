import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import login_illustration from '/public/login_illustration.png';
import { toast, Toaster } from 'sonner';

const LoginComponent = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        post('/login', {
            onError: (errors) => {
                Object.values(errors).forEach((error: any) => {
                    toast.error(error);
                });
            },
            onSuccess: () => {
                toast.success('Welcome back 👋');
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Toaster richColors position="top-right" />

            <div className="flex w-full flex-col lg:flex-row max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Visual Side */}
                <div className="relative lg:w-1/2 flex-col items-center justify-center bg-indigo-600 p-12 text-white md:flex">
                    <img
                        src={login_illustration}
                        alt="Login Illustration"
                        className="mb-6 h-64 w-64 object-contain"
                    />
                    <h1 className="mb-4 text-3xl text-center font-bold">Welcome Back!</h1>
                    <p className="text-center text-indigo-200">
                        Login to access your account and manage your
                        marketplace.
                    </p>
                </div>

                {/* Form Side */}
                <div className="w-full p-8 md:w-1/2 lg:p-12">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">
                        Login
                    </h2>

                    {/* Display top error banner if login fails */}
                    {errors.email && (
                        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
                            {errors.email}
                        </div>
                    )}

                    {errors.password && (
                        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
                            {errors.password}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email */}

                        <input type="hidden" name="role" value="user"></input>
                        <div>
                            <label className="text-sm font-semibold text-gray-600">
                                Email Address
                            </label>
                            <input
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                type="email"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="name@address.com"
                            />
                        </div>
                        {/* Password */}
                        <div className="relative">
                            <label className="text-sm font-semibold text-gray-600">
                                Password
                            </label>
                            <input
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                type={showPassword ? 'text' : 'password'}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-20 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="********"
                            />
                            {data.password && (
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-9 right-4 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            )}
                        </div>
                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <a
                                href="/forgotten-password"
                                className="text-sm text-indigo-600 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full cursor-pointer rounded-lg bg-indigo-600 py-3 disabled:cursor-not-allowed disabled:opacity-40 font-bold text-white transition hover:bg-indigo-700"
                        >
                            {processing ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            className="cursor-pointer font-semibold text-indigo-600 hover:underline"
                            onClick={() => router.get('/register')}
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
