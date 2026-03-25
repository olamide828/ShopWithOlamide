import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { errors, post, data, setData, processing } = useForm({
        email: '',
        password: '',
    });

    const handleLogin = (e: any) => {
        e.preventDefault();
        // // Basic validation
        // if (!email?.trim() || !password.trim()) {
        //     setErrorMessage('This input field is required');
        //     return;
        // } else {
        //     setErrorMessage('');
        // }

        try {
            post('/login', {
                onFinish: () => {
                    console.log('Login request finished');
                },
                onError: (errors) => {
                    if (errors.email || errors.password) {
                        setErrorMessage('Invalid credentials');
                    }
                },
                onSuccess: (response) => {
                    router.get('/dashboard');
                    console.log('Login successful:', response);
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600 p-4">
            <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Visual Side */}
                <div className="relative hidden w-1/2 bg-slate-900 p-12 text-white md:block">
                    <h1 className="mb-6 text-4xl font-bold">Welcome Back.</h1>
                    <p className="text-slate-400">Log in to gain access</p>
                    <img
                        src="/user_login_bg.png"
                        className="absolute bottom-0 left-1 w-87.5 opacity-30"
                        alt=""
                    />
                </div>

                {/* Form Side */}
                <div className="w-full p-8 md:w-1/2 lg:p-12">
                    <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                    {/* {status && <div className="mt-4 text-sm font-medium text-green-600">{status}</div>} */}

                    <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-15 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                            {/* {password && (
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-9 right-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            )} */}
                        </div>
                        <span className="block w-fit cursor-pointer text-sm text-indigo-600 hover:underline">
                            <a href="/forgotten-password">Forgot password?</a>
                        </span>
                        <button
                            disabled={processing}
                            className="w-full cursor-pointer rounded-lg bg-indigo-600 py-3 font-bold text-white transition hover:bg-indigo-700"
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <p>
                        Don't have an account?{' '}
                        <button
                            className="cursor-pointer text-indigo-600 hover:underline"
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

export default Login;
