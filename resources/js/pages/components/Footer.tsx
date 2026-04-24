import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaEnvelope, FaPhone } from 'react-icons/fa';
import useLocation from './useLocation';

const Footer = () => {
    const [email, setEmail] = useState('');
    // const { location, error } = useLocation();

    // const address =  "my address";

    // if(error) return <p>Error: {error.message}</p>
    // if(!location) return <p>Loading...</p>
    // const [address, setAddress] = useState<string | null>(null);
    //     const [error, setError] = useState<string | null>(null);

    //     useEffect(() => {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 fetch(
    //                     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon${longitude}&addressdetails=1`,
    //                 )
    //                     .then((response) => response.json())
    //                     .then((data) => setAddress(data.display_name))
    //                     .catch((error) => setError('Failed to fetch address'));
    //             },
    //             (error) => setError(error.message),
    //         );
    //     }, []);

    //     if (error) return <p>Error: {error}</p>;
    //     if (!address) return <p>Loading...</p>;

    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-[#050816]">
            {/* Background glow */}
            <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"></div>
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-12">
                {/* Newsletter */}
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl lg:p-12">
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.3em] text-gray-300 uppercase">
                                Stay Updated
                            </span>

                            <h2 className="mt-6 text-3xl leading-tight font-black text-white md:text-4xl">
                                Get the latest offers, new arrivals and
                                exclusive updates
                            </h2>

                            <p className="mt-4 max-w-xl text-base leading-8 text-gray-400">
                                Subscribe to our newsletter and be the first to
                                know about new products, special discounts and
                                curated picks from ShopWithOlamide.
                            </p>
                        </div>

                        <form className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 pr-14 text-white backdrop-blur-md transition outline-none placeholder:text-gray-500 focus:border-blue-500"
                                />

                                <FaEnvelope className="absolute top-1/2 right-5 -translate-y-1/2 text-gray-500" />
                            </div>

                            <button
                                type="submit"
                                className="group flex h-14 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(99,102,241,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(99,102,241,0.45)]"
                            >
                                Subscribe
                                <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-20 grid grid-cols-1 gap-14 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block">
                            <h1 className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                ShopWithOlamide
                            </h1>
                        </Link>

                        <p className="mt-4 max-w-md text-base leading-8 text-gray-400">
                            A modern marketplace built to help you discover
                            quality products, better prices and a shopping
                            experience you can trust every time.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                                <p className="text-2xl font-bold text-white">
                                    10K+
                                </p>
                                <p className="mt-1 text-sm text-gray-400">
                                    Happy Customers
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                                <p className="text-2xl font-bold text-white">
                                    5K+
                                </p>
                                <p className="mt-1 text-sm text-gray-400">
                                    Products Available
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-400 transition hover:text-white"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-400 transition hover:text-white"
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/shop/u/products"
                                    className="text-gray-400 transition hover:text-white"
                                >
                                    Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-400 transition hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* <div>
                        <h3 className="mb-6 text-lg font-semibold text-white">
                            For Sellers
                        </h3>

                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/seller-registration"
                                    className="text-gray-400 transition hover:text-white"
                                >
                                    Become a seller Today
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/seller-login"
                                    className="text-gray-400 transition hover:text-white"
                                >
                                    Login seller account
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/seller"
                                    className="text-gray-400 transition hover:text-white"
                                >
                                    Seller Dashboard
                                </Link>
                            </li>

                            
                        </ul>
                    </div> */}

                    {/* Contact */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-white">
                            Contact
                        </h3>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] text-blue-400">
                                    <FaEnvelope />
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email Us
                                    </p>
                                    <a
                                        href="mailto:adegboyega00001@gmail.com"
                                        className="text-sm text-gray-300 transition hover:text-white"
                                    >
                                        adegboyega00001@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] text-purple-400">
                                    <FaPhone />
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Call Us
                                    </p>
                                    <a href="tel:+2349070079206">
                                        <p className="text-sm text-gray-300">
                                            +234 907 007 9206
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 md:flex-row md:text-left">
                    <p>© 2018 - {year} ShopWithOlamide. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <a
                            href="/privacy-policy"
                            target="_blank"
                            className="transition hover:text-gray-300"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="/terms"
                            target="_blank"
                            className="transition hover:text-gray-300"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
