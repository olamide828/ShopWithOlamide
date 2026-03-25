import { Link } from '@inertiajs/react';
import React from 'react';
import { FaUser, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
    return (
        <section className="px-14 mb-3 z-50 sticky top-0 bg-white flex items-center justify-between py-6">
            <div>
                <Link href="/" className='w-fit'>
                    <h1 className="bg-linear-to-r w-fit from-blue-500 to-purple-500 bg-clip-text text-2xl leading-none font-bold text-transparent">
                    ShopWithOlamide <br />
                    <span className="text-sm text-black">
                        #TheBestRetailStore
                    </span>
                </h1>
                </Link>
            </div>
            <div>
                <ul className="flex items-center gap-4">
                    <Link href="/">
                        <li>Home</li>
                    </Link>
                    <Link href="#">
                        <li>About</li>
                    </Link>
                    <Link href="/dashboard">
                        <li>Dashboard</li>
                    </Link>
                </ul>
            </div>
            <div className="flex gap-4">
                <Link href="/login" className="border-none outline-none">
                    <button className="flex cursor-pointer items-center gap-2 rounded-md bg-white px-4 py-2 text-black hover:bg-gray-200">
                        <FaUser />
                        Login
                    </button>
                </Link>

                <Link
                    href="/register"
                    className="w-fit border-none outline-none"
                >
                    <button className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        <FaUserPlus />
                        Sign Up
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Navbar;
