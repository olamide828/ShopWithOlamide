import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    FaArrowRight,
    FaCheckCircle,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
    FaUserPlus,
} from 'react-icons/fa';
import SMILEY_PIC from '/public/smiley_pic.jpg';
import { toast, Toaster } from 'sonner';

const AdminRegisterComponent = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, errors, post, processing } = useForm({
        fullName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        role: 'admin',
    });

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        post('/register', {
            onError: (errors) => {
                Object.values(errors).forEach((error: any) => {
                    toast.error(error);
                });
            },

            onSuccess: () => {
                setSuccessMessage('Admin account created successfully!');

                setTimeout(() => {
                    router.get('/admin/login');
                }, 1800);
            },
        });
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-10">
            <Toaster richColors position="top-right" />

            <div className="absolute top-[-100px] left-[-100px] h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute right-[-120px] bottom-[-120px] h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:grid md:grid-cols-2">
                {/* Left Panel */}
                <div className="hidden bg-gradient-to-br from-slate-950 via-slate-900 to-fuchsia-950 p-12 text-white md:flex md:flex-col md:justify-between">
                    <div>
                        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-fuchsia-300 backdrop-blur-sm">
                            <FaUserPlus className="text-2xl" />
                        </div>

                        <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-fuchsia-300 uppercase">
                            Administrator Setup
                        </p>

                        <h1 className="text-5xl leading-tight font-black">
                            Create a new
                            <span className="block bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                                Admin Account
                            </span>
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
                            Add a trusted administrator to your platform with
                            full access to dashboard controls, users, and
                            products.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/20 text-fuchsia-300">
                                <FaShieldAlt />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">
                                    Security Level
                                </p>
                                <p className="font-semibold text-white">
                                    High Privilege Access
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="bg-white px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
                    <div className="mx-auto max-w-md">
                        <div className="mb-8 text-center md:text-left">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 shadow-md md:mx-0">
                                <img
                                    src={SMILEY_PIC}
                                    alt="admin"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <h2 className="text-4xl font-black text-slate-900">
                                Create Account
                            </h2>

                            <p className="mt-3 text-slate-500">
                                Set up a new administrator profile for the
                                platform.
                            </p>
                        </div>

                        {successMessage && (
                            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-green-700 shadow-sm">
                                <FaCheckCircle className="text-green-600" />
                                <span className="text-sm font-semibold">
                                    {successMessage}
                                </span>
                            </div>
                        )}
                        {errors.email && (
                            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 shadow-sm">
                                {errors.email}
                            </div>
                        )}
                        {errors.password && (
                            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 shadow-sm">
                                {errors.password}
                            </div>
                        )}
                        {errors.fullName && (
                            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 shadow-sm">
                                {errors.fullName}
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={data.fullName}
                                    onChange={(e) =>
                                        setData('fullName', e.target.value)
                                    }
                                    placeholder="John Doe"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:ring-4 focus:ring-fuchsia-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder="admin@system.com"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:ring-4 focus:ring-fuchsia-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Admin Date of Birth (DD/MM/YYYY)
                                </label>
                                <input
                                    type="date"
                                    value={data.dateOfBirth}
                                    onChange={(e) =>
                                        setData('dateOfBirth', e.target.value)
                                    }
                                    className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Date of Birth(DD/MM/YYYY)"
                                />
                                {errors.dateOfBirth && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.dateOfBirth}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        placeholder="Create a secure password"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 pr-14 transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-fuchsia-500 focus:bg-white focus:ring-4 focus:ring-fuchsia-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash size={18} />
                                        ) : (
                                            <FaEye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-slate-900 py-4 text-sm font-bold tracking-[0.18em] text-white uppercase shadow-[0_12px_30px_rgba(147,51,234,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(99,102,241,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing
                                    ? 'Creating Account...'
                                    : 'Create Admin Account'}
                                {!processing && (
                                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                                )}
                            </button>
                        </form>

                        <div className="mt-8 border-t border-slate-200 pt-6 text-center">
                            <p className="text-sm text-slate-500">
                                Already have an account?
                            </p>

                            <button
                                onClick={() => router.get('/admin/login')}
                                className="mt-2 cursor-pointer text-sm font-semibold text-fuchsia-600 transition hover:text-fuchsia-800 hover:underline"
                            >
                                Back to Admin Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminRegisterComponent;
