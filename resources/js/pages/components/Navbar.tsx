import { Link, router, usePage } from '@inertiajs/react';
import React from 'react';
import { FaChevronDown, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
    const { auth, cartCount }: any = usePage().props;
    const user = auth.user;

    const [open, setOpen] = React.useState(false);
    const [localCartCount, setLocalCartCount] = React.useState(cartCount || 0);

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

    const initials = user?.name
        ?.split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
                {/* Logo */}
                <Link href="/" className="flex flex-col leading-none">
                    <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent">
                        ShopWithOlamide
                    </h1>
                    <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400">
                        Premium Marketplace
                    </span>
                </Link>

                {/* Nav Links */}
                <nav className="hidden items-center gap-8 md:flex">
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
                    <Link
                        href="/cart"
                        className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                        <FaShoppingCart size={18} />

                        {localCartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                {localCartCount}
                            </span>
                        )}
                    </Link>

                    {!user ? (
                        <div className="flex items-center gap-3">
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
                        <div className="relative">
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
                                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                                    <div className="border-b border-gray-100 px-5 py-4">
                                        <p className="text-xs uppercase tracking-wide text-gray-400">
                                            Signed in as
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-gray-900">
                                            {user.name}
                                        </p>
                                    </div>

                                    <Link
                                        href="/dashboard"
                                        className="block px-5 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Dashboard
                                    </Link>

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
        </header>
    );
};
export default Navbar;