import { Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import {
    FaChevronDown,
    FaShoppingCart,
    FaArrowRight,
    FaHamburger,
    FaTimes,
} from 'react-icons/fa';
import { toast, Toaster } from 'sonner';

const NavbarHero = () => {
    const [open, setOpen] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const { auth, cartCount }: any = usePage().props;

    const user = auth.user;

    const initials = user?.name
        ?.split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();

    const logout = () => {
        router.post(
            '/logout',
            {},
            {
                onSuccess: () => {
                    toast.success('Successfully signed out');
                },
            },
        );
    };

    const [localCartCount, setLocalCartCount] = useState(cartCount || 0);

    const pageReload = () => {
        window.location.reload();
    };

    useEffect(() => {
        setLocalCartCount(cartCount || 0);
    }, [cartCount]);

    useEffect(() => {
        const handler = () => {
            setLocalCartCount((prev: number) => prev + 1);
        };

        window.addEventListener('cart:added', handler);

        return () => window.removeEventListener('cart:added', handler);
    }, []);

    useEffect(() => {
        if (mobileNav) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => document.body.classList.remove('overflow-hidden');
    }, [mobileNav]);

    return (
        <section className='relative min-h-screen overflow-hidden bg-[url("https://images.unsplash.com/photo-1668104130113-b86b10423cb0?w=1200&auto=format&fit=crop&q=80")] bg-cover bg-center'>
            <Toaster richColors position="top-right" />

            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

            {/* Navbar */}
            <div className="relative z-50 flex items-center justify-between px-6 py-6 lg:px-14">
                <Link href="/">
                    <div onClick={pageReload} className="cursor-pointer">
                        <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
                            ShopWithOlamide
                        </h1>
                        <p className="mt-1 text-xs tracking-[0.35em] text-gray-300 uppercase">
                            Premium Marketplace Experience
                        </p>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-4 lg:flex">
                    {user?.role !== 'admin' && (
                        <Link
                            href="/cart"
                            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                        >
                            <FaShoppingCart size={18} />

                            {localCartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                    {localCartCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <button className="cursor-pointer rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-black">
                                    Login
                                </button>
                            </Link>

                            <Link href="/register">
                                <button className="cursor-pointer rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-white backdrop-blur-md transition hover:bg-white/20"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-bold text-white">
                                    {initials}
                                </div>

                                <div className="hidden text-left md:block">
                                    <p className="text-sm font-semibold">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-300">
                                        Welcome back
                                    </p>
                                </div>

                                <FaChevronDown
                                    size={12}
                                    className={`transition duration-300 ${open ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
                                    <div className="border-b border-gray-100 px-5 py-4">
                                        <p className="text-sm text-gray-500">
                                            Signed in as
                                        </p>
                                        <p className="mt-1 font-semibold text-gray-900">
                                            {user.name}
                                        </p>
                                    </div>

                                    <>
                                        {user?.role === 'admin' ? (
                                            <Link
                                                href="/admin"
                                                className="block px-5 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        ) : (
                                            <Link
                                                href="/dashboard"
                                                className="block px-5 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
                                            >
                                                Dashboard
                                            </Link>
                                        )}
                                    </>

                                    <button
                                        onClick={logout}
                                        className="w-full cursor-pointer px-5 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileNav(!mobileNav)}
                    className="relative z-100 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/20 lg:hidden"
                >
                    {mobileNav ? (
                        <FaTimes size={18} />
                    ) : (
                        <FaHamburger size={18} />
                    )}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileNav && (
                <section className="fixed inset-0 z-[90] lg:hidden">
                    <div
                        onClick={() => setMobileNav(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <div className="absolute top-0 right-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-[#0B0B12] px-6 py-6 shadow-2xl">
                        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
                            <div>
                                <h2 className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
                                    ShopWithOlamide
                                </h2>
                                <p className="mt-1 text-xs tracking-[0.3em] text-gray-400 uppercase">
                                    Premium Marketplace
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Link
                                href="/"
                                onClick={() => setMobileNav(false)}
                                className="rounded-2xl px-4 py-4 text-base font-medium text-white transition hover:bg-white/10"
                            >
                                Home
                            </Link>

                            <Link
                                href="/shop/u/products"
                                onClick={() => setMobileNav(false)}
                                className="rounded-2xl px-4 py-4 text-base font-medium text-white transition hover:bg-white/10"
                            >
                                Products
                            </Link>

                            <Link
                                href="/about"
                                onClick={() => setMobileNav(false)}
                                className="rounded-2xl px-4 py-4 text-base font-medium text-white transition hover:bg-white/10"
                            >
                                About Us
                            </Link>

                            <Link
                                href="/contact"
                                onClick={() => setMobileNav(false)}
                                className="rounded-2xl px-4 py-4 text-base font-medium text-white transition hover:bg-white/10"
                            >
                                Contact
                            </Link>

                            {user?.role !== 'admin' && (
                                <Link
                                    href="/cart"
                                    onClick={() => setMobileNav(false)}
                                    className="mt-2 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white transition hover:bg-white/10"
                                >
                                    <div className="flex items-center gap-3">
                                        <FaShoppingCart size={18} />
                                        <span className="font-medium">
                                            Cart
                                        </span>
                                    </div>

                                    {localCartCount > 0 && (
                                        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
                                            {localCartCount}
                                        </span>
                                    )}
                                </Link>
                            )}
                        </div>

                        <div className="mt-auto border-t border-white/10 pt-6">
                            {!user ? (
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileNav(false)}
                                    >
                                        <button className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-black">
                                            Login
                                        </button>
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() => setMobileNav(false)}
                                    >
                                        <button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4 text-sm font-semibold text-white transition hover:scale-[1.02]">
                                            Get Started
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-bold text-white">
                                            {initials}
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Welcome back
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {user?.role === 'admin' ? (
                                            <Link
                                                href="/admin"
                                                onClick={() =>
                                                    setMobileNav(false)
                                                }
                                                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white transition hover:bg-white/10"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        ) : (
                                            <Link
                                                href="/dashboard"
                                                onClick={() =>
                                                    setMobileNav(false)
                                                }
                                                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white transition hover:bg-white/10"
                                            >
                                                Dashboard
                                            </Link>
                                        )}
                                        {/* Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Eligendi, voluptatem
                                        recusandae facilis fugit assumenda
                                        cupiditate deleniti inventore quasi
                                        explicabo magni. */}
                                        <button
                                            onClick={() => {
                                                setMobileNav(false);
                                                logout();
                                            }}
                                            className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Hero Content */}
            <div className="relative z-40 flex min-h-[calc(100vh-100px)] items-center px-6 lg:px-14">
                <div className="max-w-3xl">
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-gray-200 backdrop-blur-md">
                        Trusted by thousands of shoppers nationwide
                    </div>

                    <h2 className="max-w-4xl text-5xl leading-tight font-black text-white md:text-6xl lg:text-7xl">
                        Discover Products That Match
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Your Lifestyle
                        </span>
                    </h2>

                    <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
                        ShopWithOlamide brings you a modern marketplace
                        experience with premium products, unbeatable prices, and
                        fast delivery.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link href="/shop/u/products">
                            <button className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white transition hover:scale-105">
                                Explore Products
                                <FaArrowRight />
                            </button>
                        </Link>

                        <Link href="/about">
                            <button className="cursor-pointer rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-black">
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NavbarHero;
