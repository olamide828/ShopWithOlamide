import React, { PropsWithChildren, useState } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import { FiSettings, FiMenu, FiX } from 'react-icons/fi';
import {
    FaShoppingBag,
    FaShoppingCart,
    FaUser,
    FaHeart,
    FaSignOutAlt,
    FaChevronRight,
    FaBoxOpen,
    FaRegEye,
    FaRegEyeSlash,
    FaArrowLeft,
    FaWallet,
    FaTruck,
} from 'react-icons/fa';
import { useForm } from '@inertiajs/react';

const UserDashboard = ({ children }: PropsWithChildren) => {
    const {
        auth,
        carts = [],
        cartTotal = 0,
        total = 0,
        activeOrders,
        orders = [],
        wishlist = [],
    } = usePage().props;
    const user = auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logout = () => router.post('/logout');

    const GradientLogo = () => (
        <span
            style={{
                display: 'inline-block',
                background:
                    'linear-gradient(to right, #3b82f6, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
            }}
        >
            ShopWithOlamide
        </span>
    );

    const statusClasses = {
        pending: 'text-yellow-700 bg-yellow-100',
        shipped: 'text-blue-700 bg-blue-100',
        delivered: 'text-green-700 bg-green-100',
        cancelled: 'text-red-700 bg-red-100',
        paid: 'text-purple-700 bg-purple-100',
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Head
                title={`${auth.user?.name} Dashboard - ShopWithOlamide`}
            ></Head>

            {/* --- MOBILE TOGGLE --- */}
            <div className="fixed top-4 right-4 z-50 md:hidden">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="rounded-md bg-white p-2 shadow"
                >
                    {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* --- SIDEBAR --- */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 transform flex-col border-r border-gray-200 bg-white transition-transform duration-300 md:flex md:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-6">
                    <h1 className="text-2xl font-extrabold">
                        <GradientLogo />
                    </h1>
                    <p className="mt-1 text-[8px] tracking-[0.35em] text-gray-300 uppercase">
                        Premium Marketplace Experience
                    </p>
                </div>

                <nav className="flex-1 space-y-1 px-4">
                    <NavItem
                        href="/dashboard"
                        icon={<FaUser />}
                        label="Account Overview"
                        active
                    />
                    <NavItem
                        href="/shop/u/products"
                        icon={<FaShoppingBag />}
                        label="Continue Shopping"
                    />
                    <NavItem
                        href="/cart"
                        icon={<FaShoppingCart />}
                        label="My Cart"
                        badge={carts.length}
                    />
                    <NavItem
                        href="/orders"
                        icon={<FaBoxOpen />}
                        label="My Orders"
                        badge={orders.length}
                    />
                    <NavItem
                        href="/wishlist"
                        icon={<FaHeart />}
                        label="Wishlist"
                        badge={wishlist.length}
                    />
                    <NavItem
                        href="/manage-account"
                        icon={<FiSettings />}
                        label="Manage Account"
                    />

                    {/* Removed Manage Account NavItem */}
                </nav>

                <div className="mt-10 p-4">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600"
                    >
                        <FaArrowLeft className="text-xs" /> Storefront
                    </Link>
                </div>

                <div className="border-t border-gray-100 p-4">
                    <button
                        onClick={logout}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 p-4 md:ml-64 md:p-8">
                {/* Header */}
                <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="pt-10 text-2xl font-bold text-gray-900 lg:pt-0">
                            Welcome back, {user.name}!
                        </h1>
                        <p className="text-gray-500">
                            Here's what's happening with your account today.
                        </p>
                    </div>
                    <button
                        onClick={() => router.get('/shop/u/products')}
                        className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-md hover:bg-indigo-700"
                    >
                        Shop Now <FaChevronRight className="text-xs" />
                    </button>
                </header>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <StatCard
                        label="Cart Items"
                        value={carts.length}
                        icon={<FaShoppingCart className="text-indigo-600" />}
                        color="bg-indigo-50"
                    />
                    <StatCard
                        label="Orders"
                        value={orders.length}
                        icon={<FaBoxOpen className="text-orange-600" />}
                        color="bg-orange-50"
                    />
                    <StatCard
                        label="Total Spent"
                        value={`$${total || '0.00'}`}
                        icon={<FaWallet className="text-green-600" />}
                        color="bg-green-50"
                    />
                    <StatCard
                        label="Cart Total"
                        value={`$${cartTotal || '0.00'}`}
                        icon={<FaShoppingBag className="text-purple-600" />}
                        color="bg-purple-50"
                    />
                    <StatCard
                        label="Active Orders"
                        value={activeOrders}
                        icon={<FaTruck className="text-blue-600" />}
                        color="bg-blue-50"
                    />
                </div>

                {/* Dashboard Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Recent Orders Table */}
                    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold">Recent Orders</h2>
                            <button
                                onClick={() => router.get('/orders')}
                                className="cursor-pointer text-sm font-semibold text-indigo-600 hover:underline"
                            >
                                View All
                            </button>
                        </div>

                        {orders.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="text-gray-400 italic">
                                    No orders found. Time to go shopping!
                                </p>
                            </div>
                        ) : (
                            <table className="w-full min-w-[500px] text-left">
                                <thead>
                                    <tr className="border-b border-gray-50 text-xs tracking-wider text-gray-400 uppercase">
                                        <th className="pb-4 font-semibold">
                                            Order ID
                                        </th>
                                        <th className="pb-4 font-semibold">
                                            Status
                                        </th>
                                        <th className="pb-4 text-right font-semibold">
                                            Date
                                        </th>
                                        <th className="pb-4 text-right font-semibold">
                                            Time
                                        </th>
                                        <th className="pb-4 text-right font-semibold">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {orders.map((order: any) => (
                                        <tr
                                            key={order.id}
                                            className="group transition-colors hover:bg-gray-50"
                                        >
                                            <td className="py-4 font-medium text-gray-900">
                                                #ORD-{order.id}
                                            </td>
                                            <td className="py-4">
                                                <span
                                                    className={`rounded-full ${statusClasses[order.status] || 'bg-gray-100 text-gray-700'} px-3 py-1 text-xs font-bold capitalize`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right text-sm font-bold">
                                                {new Date(
                                                    order.created_at,
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 text-right text-sm font-bold">
                                                {new Date(
                                                    order.updated_at,
                                                ).toLocaleTimeString()}
                                            </td>
                                            <td className="py-4 text-right font-bold">
                                                ${order.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Mini Cart Preview */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <h2 className="mb-6 text-lg font-bold">Cart Summary</h2>
                        <div className="space-y-4">
                            {carts.slice(0, 3).map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <img
                                        src={item.product.image}
                                        className="h-12 w-12 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="line-clamp-1 text-sm font-semibold text-gray-800">
                                            {item.product.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            ${item.price} x {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {new Date(
                                            item.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}

                            {carts.length > 3 && (
                                <p className="text-center text-xs text-gray-400">
                                    + {carts.length - 3} more items
                                </p>
                            )}

                            <div className="border-t border-gray-100 pt-4">
                                <div className="mb-4 flex justify-between">
                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>
                                    <span className="font-bold text-gray-900">
                                        ${cartTotal}
                                    </span>
                                </div>
                                <button
                                    disabled={carts.length < 1}
                                    onClick={() => router.get('/cart')}
                                    className={`block w-full rounded-xl py-3 text-center font-bold ${carts.length < 1 ? 'cursor-not-allowed bg-gray-100 text-black' : 'cursor-pointer bg-gray-900 text-white hover:bg-black'}`}
                                >
                                    Review & Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WishList Preview */}
                <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-lg font-bold">Wishlist</h2>
                        <Link
                            href="/wishlist"
                            className="text-sm font-semibold text-pink-600 hover:underline"
                        >
                            View All
                        </Link>
                    </div>

                    {wishlist.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">
                            No wishlist items yet.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {wishlist.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 rounded-xl border border-gray-100 p-3"
                                >
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="h-14 w-14 rounded-lg object-cover"
                                    />

                                    <div className="flex-1">
                                        <p className="line-clamp-1 text-sm font-semibold text-gray-800">
                                            {item.product.name}
                                        </p>
                                        <p className="text-sm font-bold text-gray-900">
                                            ${item.product.price}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            router.post(`/cart`, {
                                                product_id: item.product.id,
                                            })
                                        }
                                        className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Render any extra children passed */}
                {children}
            </main>
        </div>
    );
};

// --- NAV ITEM ---
const NavItem = ({ href, icon, label, active = false, badge = 0 }) => (
    <Link
        href={href}
        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
            active
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        }`}
    >
        <div className="flex items-center gap-3">
            {icon} {label}
        </div>
        {badge > 0 && (
            <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] text-white">
                {badge}
            </span>
        )}
    </Link>
);

// --- STAT CARD ---
const StatCard = ({ label, value, icon, color }) => (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className={`rounded-xl p-4 ${color} text-2xl`}>{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
    </div>
);

export default UserDashboard;
