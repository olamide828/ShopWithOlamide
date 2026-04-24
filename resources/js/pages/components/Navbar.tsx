import { Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import {
    FaChevronDown,
    FaHamburger,
    FaShoppingCart,
    FaTimes,
} from 'react-icons/fa';

const Navbar = () => {
    const { auth, cartCount }: any = usePage().props;
    const user = auth.user;

    const [open, setOpen] = React.useState(false);
    const [localCartCount, setLocalCartCount] = React.useState(cartCount || 0);
    const [mobileNav, setMobileNav] = useState(false);

    React.useEffect(() => {
        setLocalCartCount(cartCount || 0);
    }, [cartCount]);

    React.useEffect(() => {
        const handler = () => {
            setLocalCartCount((prev: number) => prev + 1);
        };

        window.addEventListener('cart:added', handler);

        return () => window.removeEventListener('cart:added', handler);
    }, []);

    const logout = () => {
        router.post('/logout');
    };

    const initials = (() => {
        if (!user?.name) return '';

        // 1. Trim and split by whitespace
        const parts = user.name.trim().split(/\s+/);

        // 2. Get the first and last name parts
        const firstPart = parts[0];
        const lastPart = parts.length > 1 ? parts[parts.length - 1] : '';

        // 3. Extract the first "character" safely (handling emojis)
        // Using [...str][0] ensures we get the full emoji, not a broken half
        const firstInitial = firstPart ? [...firstPart][0] : '';
        const lastInitial = lastPart ? [...lastPart][0] : '';

        return (firstInitial + lastInitial).toUpperCase();
    })();

    useEffect(() => {
        if (mobileNav) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => document.body.classList.remove('overflow-hidden');
    }, [mobileNav]);

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
                {/* Logo */}
                <Link href="/" className="flex flex-col leading-none">
                    <h1 className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent">
                        ShopWithOlamide
                    </h1>
                    <span className="mt-1 text-[10px] font-medium tracking-[0.3em] text-gray-400 uppercase">
                        Premium Marketplace
                    </span>
                </Link>

                {/* Nav Links */}
                <nav className="hidden items-center gap-8 lg:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        Home
                    </Link>

                    <Link
                        href="/shop/u/products"
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        Products
                    </Link>

                    <Link
                        href="/about"
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        About
                    </Link>

                    <Link
                        href="/contact"
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Cart */}
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

                    <button
                        onClick={() => setMobileNav(!mobileNav)}
                        className="relative z-[100] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-black backdrop-blur-md transition hover:scale-105 hover:bg-white/20 lg:hidden"
                    >
                        {mobileNav ? (
                            <FaTimes size={18} />
                        ) : (
                            <FaHamburger size={18} />
                        )}
                    </button>

                    {!user ? (
                        <div className="hidden items-center gap-3 lg:flex">
                            <Link href="/login">
                                <button className="cursor-pointer rounded-2xl px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                                    Login
                                </button>
                            </Link>

                            <Link href="/register">
                                <button className="cursor-pointer rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:scale-[1.02]">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="relative hidden lg:flex">
                            {/* Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Neque laboriosam atque tempore accusantium
                            dolorem dolore non nemo quibusdam! Expedita sequi
                            optio repellendus nulla, illo laborum, quo inventore
                            atque tenetur ipsam quam iste earum dolorem commodi
                            quisquam veritatis et nobis ea natus consequatur.
                            Alias tenetur recusandae natus. Corrupti
                            exercitationem numquam, deleniti eum nulla nam ipsam
                            quo possimus! Rerum officia voluptatibus amet iusto
                            autem impedit dicta sequi iste ad ratione molestias,
                            nostrum consequuntur sapiente quae nemo deserunt
                            modi maiores repudiandae eligendi hic explicabo!
                            Debitis, nemo. Porro distinctio necessitatibus odit
                            tenetur odio optio, quam, quaerat aperiam,
                            consequatur autem minima? Exercitationem ex eos
                            quasi. */}
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 transition hover:border-gray-300 hover:bg-gray-50"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-bold text-white">
                                    {initials}
                                </div>

                                <div className="hidden text-left sm:block">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Welcome back
                                    </p>
                                </div>

                                <FaChevronDown
                                    size={12}
                                    className={`text-gray-500 transition duration-300 ${
                                        open ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {open && (
                                <div className="absolute top-12 right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                                    <div className="border-b border-gray-100 px-5 py-4">
                                        <p className="text-xs tracking-wide text-gray-400 uppercase">
                                            Signed in as
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-gray-900">
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
            </div>
            {/* Mobile Nav */}
            {mobileNav && (
                <section className="fixed inset-0 z-[90] h-screen lg:hidden">
                    <div
                        onClick={() => setMobileNav(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <div className="absolute top-0 right-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-[#0B0B12] px-6 py-6 shadow-2xl">
                        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
                            <div>
                                <h2 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
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
                                        <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
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
        </header>
    );
};
export default Navbar;
