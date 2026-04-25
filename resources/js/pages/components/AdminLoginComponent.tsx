import { router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    FaArrowRight,
    FaEye,
    FaEyeSlash,
    FaLock,
    FaShieldAlt,
    FaUserShield,
} from 'react-icons/fa';
import { toast, Toaster } from 'sonner';

const AdminLoginComponent = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        role: 'admin',
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
                toast.success(`Welcome back ${auth.user.name}👋`);
            },
        });
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-10">
            <Toaster richColors position="top-right" />

            {/* Background Glow */}
            <div className="absolute top-[-120px] left-[-120px] h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />
            <div className="absolute right-[-120px] bottom-[-120px] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative z-10 flex w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                {/* Left Side */}
                <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-12 text-white md:flex">
                    <div>
                        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-lg backdrop-blur-sm">
                            <FaShieldAlt className="text-3xl text-indigo-400" />
                        </div>

                        <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-indigo-300 uppercase">
                            Secure Portal
                        </p>

                        <h1 className="max-w-sm text-5xl leading-tight font-black">
                            Welcome back,
                            <span className="block bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                                Administrator
                            </span>
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
                            Access your management dashboard, control platform
                            activity, manage products, users, and monitor
                            everything from one secure place.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
                                <FaUserShield />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">
                                    Protected Session
                                </p>
                                <p className="font-semibold text-white">
                                    Admin-only Access Enabled
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full bg-white px-6 py-10 sm:px-10 md:w-1/2 md:px-12 lg:px-14 lg:py-14">
                    <div className="mx-auto max-w-md">
                        <div className="mb-8 md:hidden">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                                <FaShieldAlt className="text-xl" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900">
                                Admin Login
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Sign in to continue to the control panel.
                            </p>
                        </div>

                        <div className="mb-8 hidden md:block">
                            <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-indigo-600 uppercase">
                                Sign In
                            </p>
                            <h2 className="text-4xl font-black text-slate-900">
                                Access Dashboard
                            </h2>
                            <p className="mt-3 text-slate-500">
                                Enter your administrator credentials below.
                            </p>
                        </div>

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

                        <form onSubmit={handleLogin} className="space-y-6">
                            <input
                                type="hidden"
                                name="role"
                                value="admin"
                            ></input>
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
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                />
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
                                        placeholder="Enter your password"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 pr-14 text-slate-900 transition-all duration-300 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    borderRadius: '16px',
                                    background:
                                        'linear-gradient(to right, #0f172a, #1e1b4b, #0f172a)',
                                    padding: '16px',
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    letterSpacing: '0.18em',
                                    color: '#ffffff',
                                    textTransform: 'uppercase',
                                    boxShadow:
                                        '0 12px 30px rgba(49,46,129,0.35)',
                                    border: 'none',
                                    cursor: processing
                                        ? 'not-allowed'
                                        : 'pointer',
                                    opacity: processing ? 0.7 : 1,
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    if (!processing) {
                                        e.currentTarget.style.transform =
                                            'translateY(-2px)';
                                        e.currentTarget.style.boxShadow =
                                            '0 18px 40px rgba(79,70,229,0.45)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(0)';
                                    e.currentTarget.style.boxShadow =
                                        '0 12px 30px rgba(49,46,129,0.35)';
                                }}
                            >
                                {processing
                                    ? 'Authenticating...'
                                    : 'Access Dashboard'}
                                {!processing && <FaArrowRight />}
                            </button>
                        </form>

                        <div className="mt-10 border-t border-slate-200 pt-6 text-center">
                            <button
                                onClick={() => router.get('/admin/register')}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    color: '#4f46e5',
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#3730a3';
                                    e.currentTarget.style.textDecoration =
                                        'underline';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#4f46e5';
                                    e.currentTarget.style.textDecoration =
                                        'none';
                                }}
                            >
                                Create Admin Account
                            </button>

                            <button
                                onClick={() => router.get('/')}
                                className="mt-4 block w-full cursor-pointer text-sm text-slate-500 transition hover:text-slate-800"
                            >
                                ← Return to Storefront
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginComponent;
