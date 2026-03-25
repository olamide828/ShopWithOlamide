import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaUser, FaUserPlus } from 'react-icons/fa';

const NavbarHero = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    const trimmedSearchBar =  search.trim();

    const handleSearch = (e: any) => {
        if (!trimmedSearchBar) {
            e.preventDefault();
            setError('This input field is required to make a search');
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <section className='relative h-screen bg-[url("https://images.unsplash.com/photo-1668104130113-b86b10423cb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFya2V0JTIwcGxhY2V8ZW58MHx8MHx8fDA%3D")] bg-cover bg-center'>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-50 flex items-center justify-between px-6 py-4">
                <h1 className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
                    ShopWithOlamide
                </h1>
                <p className="text-lg text-white">
                    #The Number One Best Retail Store
                </p>
                <div className="flex gap-4">
                    <Link href="/login" className='border-none outline-none'>
                        <button className="flex cursor-pointer items-center gap-2 rounded-md bg-white px-4 py-2 text-black hover:bg-gray-200">
                            <FaUser />
                            Login
                        </button>
                    </Link>

                    <Link href="/register" className='border-none outline-none w-fit'>
                        <button className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                            <FaUserPlus />
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>

            {/* NavHero */}
            <div className="h-fit w-fit px-6">
                <h2 className="relative z-50 mt-30 py-4 text-[50px] leading-tight font-bold text-white">
                    Welcome to <br />{' '}
                    <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        ShopWithOlamide
                    </span>
                </h2>
                <form
                    onSubmit={handleSearch}
                    className="relative z-50 flex h-10 w-100 flex-row overflow-hidden rounded-md bg-white"
                >
                    <input
                        type="text"
                        name={search.trim()}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for products..."
                        className="h-full w-[80%] border border-gray-300 bg-white px-4 text-black placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button className="cursor-pointer border-none outline-none bg-gray-200 px-4 py-2 text-black hover:bg-gray-300">
                        Search
                    </button>
                </form>
                {!search && (
                    <p className="relative z-50 text-red-600">{error}</p>
                )}
            </div>
        </section>
    );
};

export default NavbarHero;
