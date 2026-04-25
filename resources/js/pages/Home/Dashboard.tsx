import React, { PropsWithChildren, useState, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    FaArrowLeft,
    FaBoxOpen,
    FaUsers,
    FaChartPie,
    FaSignOutAlt,
    FaUserSlash,
    FaBars,
    FaTimes,
} from 'react-icons/fa';

export default function Dashboard({ children }: PropsWithChildren) {
    const { url } = usePage();
    const { auth }: any = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const avatarName = auth.user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    // Close sidebar when URL changes (mobile optimization)
    useEffect(() => {
        setSidebarOpen(false);
    }, [url]);

    const isActive = (path: string) => url === path;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Header (Sticky) */}
            <div className="fixed top-0 right-0 left-0 z-30 flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
                <h1
                    className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-2xl font-extrabold"
                    style={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    ShopWithOlamide
                </h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 text-gray-600 focus:outline-none"
                >
                    {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="flex h-full flex-col">
                    <div className="p-6 md:block">
                        <h1 className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                            ShopWithOlamide
                        </h1>
                        <p className="mt-1 text-[8px] font-bold tracking-[0.35em] text-gray-400 uppercase">
                            Admin Control Panel
                        </p>
                    </div>

                    <nav className="flex-1 space-y-1 px-4 pt-20 md:pt-4">
                        <AdminNavItem
                            href="/admin"
                            icon={<FaChartPie />}
                            label="Overview"
                            active={isActive('/admin')}
                        />
                        <AdminNavItem
                            href="/admin/products"
                            icon={<FaBoxOpen />}
                            label="Products"
                            active={isActive('/admin/products')}
                        />
                        <AdminNavItem
                            href="/admin/orders"
                            icon={<FaUsers />}
                            label="Orders"
                            active={isActive('/admin/users')}
                        />
                        <AdminNavItem
                            href="/admin/manage-users"
                            icon={<FaUserSlash />}
                            label="Manage Users"
                            active={isActive('/admin/manage-users')}
                        />
                    </nav>

                    <div className="border-t border-gray-100 p-4">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600"
                        >
                            <FaArrowLeft className="text-xs" /> Storefront
                        </Link>
                        <button
                            onClick={() => router.post('/logout')}
                            className="mt-2 flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-200"
                        >
                            <FaSignOutAlt /> Sign Out
                        </button>
                    </div>
                </div>
            </aside>
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex w-full flex-col transition-all duration-300 md:ml-64">
                <header className="hidden items-center justify-between border-b bg-white px-8 py-4 md:flex">
                    <div className="flex flex-col">
                        <h1 className="pt-10 text-lg font-bold text-gray-900 lg:pt-0 lg:text-2xl">
                            Welcome back Admin, {auth.user?.name}!
                        </h1>
                        <p className="text-sm text-gray-500 lg:text-base">
                            Control users, list products and manage analytics on
                            your admin dashboard.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 shadow-sm">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                            {avatarName}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                            {auth.user.name}
                        </span>
                    </div>
                </header>

                <div className="flex-1 overflow-x-hidden p-4 pt-20 md:p-8 md:pt-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

const AdminNavItem = ({ href, icon, label, active }) => (
    <Link
        href={href}
        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
            active
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        }`}
    >
        {icon} {label}
    </Link>
);
