import React, { PropsWithChildren } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    FaArrowLeft,
    FaBoxOpen,
    FaHouseUser,
    FaProductHunt,
} from 'react-icons/fa';

export default function Dashboard({ children }: PropsWithChildren) {
    const { url } = usePage();
    const { auth }: any = usePage().props;
    const avatarName = auth.user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

    const isActive = (path: string) =>
        url.startsWith(path) ? 'bg-gray-700' : 'bg-transparent';

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="flex w-80 flex-col bg-gray-900 p-5 text-white">
                {!auth.user ? (
                    <h1 className="text-2xl font-bold text-gray-900">
                        My Dashboard
                    </h1>
                ) : (
                    <div className="mb-6 flex items-center gap-4 rounded-xl border bg-white/40 cursor-pointer p-3 shadow-sm transition hover:shadow-md">
                        {/* Avatar */}
                        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-600 text-sm font-semibold text-white shadow">
                            {avatarName}
                        </div>

                        {/* Name */}
                        <h2 className="text-lg font-semibold text-gray-800">
                            {auth.user.name}
                        </h2>
                    </div>
                )}

                <nav className="flex flex-col gap-3">
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-gray-700 ${isActive(
                            '/dashboard',
                        )}`}
                    >
                        <FaHouseUser /> Home
                    </Link>

                    <Link
                        href="/dashboard/products"
                        className={`flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-gray-700 ${isActive(
                            '/dashboard/products',
                        )}`}
                    >
                        <FaBoxOpen /> Products
                    </Link>
                </nav>

                {/* Logout */}
                <div className="mt-auto pt-6">
                    <button
                        onClick={() => router.get('/')}
                        className="m-auto mb-3 flex cursor-pointer flex-row items-center gap-2 text-sm hover:text-gray-300 hover:underline"
                    >
                        <FaArrowLeft /> Back To Home
                    </button>
                    <button className="w-full cursor-pointer rounded-lg bg-red-500 py-2 transition hover:bg-red-600">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
    );
}
