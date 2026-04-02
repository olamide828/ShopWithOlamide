import React, { PropsWithChildren, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { FiSettings, FiMenu, FiX } from 'react-icons/fi';
import {
    FaShoppingBag,
    FaShoppingCart,
    FaUser,
    FaHeart,
    FaSignOutAlt,
    FaChevronRight,
    FaBoxOpen,
} from 'react-icons/fa';
import { useForm } from '@inertiajs/react';

const UserDashboard = ({ children }: PropsWithChildren) => {
    const { auth, carts, total, orders = [] } = usePage().props;
    const user = auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logout = () => router.post('/logout');

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* --- MOBILE TOGGLE --- */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-md bg-white shadow"
                >
                    {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* --- SIDEBAR --- */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 flex-col border-r border-gray-200 bg-white transform transition-transform duration-300 md:flex md:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-6">
                    <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
                        ShopWithOlamide
                    </h1>
                    <p className="mt-1 text-[8px] tracking-[0.35em] text-gray-300 uppercase">
                        Premium Marketplace Experience
                    </p>
                </div>

                <nav className="flex-1 space-y-1 px-4">
                    <NavItem href="/dashboard" icon={<FaUser />} label="Account Overview" active />
                    <NavItem href="/shop/u/products" icon={<FaShoppingBag />} label="Continue Shopping" />
                    <NavItem href="/cart" icon={<FaShoppingCart />} label="My Cart" badge={carts.length} />
                    <NavItem href="/orders" icon={<FaBoxOpen />} label="My Orders" />
                    <NavItem href="/wishlist" icon={<FaHeart />} label="Wishlist" />
                    <NavItem href="#manage-account" icon={<FiSettings />} label="Manage Account" />
                </nav>

                <div className="border-t border-gray-100 p-4">
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100"
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
                        <h1 className="text-2xl pt-10 lg:pt-0 font-bold text-gray-900">
                            Welcome back, {user.name}!
                        </h1>
                        <p className="text-gray-500">
                            Here's what's happening with your account today.
                        </p>
                    </div>
                    <Link
                        href="/shop/u/products"
                        className="flex w-fit items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-md hover:bg-indigo-700"
                    >
                        Shop Now <FaChevronRight className="text-xs" />
                    </Link>
                </header>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <StatCard
                        label="Cart Items"
                        value={carts.length}
                        icon={<FaShoppingCart className="text-blue-600" />}
                        color="bg-blue-50"
                    />
                    <StatCard
                        label="Active Orders"
                        value={orders.length}
                        icon={<FaBoxOpen className="text-orange-600" />}
                        color="bg-orange-50"
                    />
                    <StatCard
                        label="Total Spent"
                        value={`$${total || '0.00'}`}
                        icon={<FaShoppingBag className="text-green-600" />}
                        color="bg-green-50"
                    />
                </div>

                {/* Dashboard Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Recent Orders Table */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2 overflow-x-auto">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold">Recent Orders</h2>
                            <Link
                                href="/orders"
                                className="text-sm font-semibold text-indigo-600 hover:underline"
                            >
                                View All
                            </Link>
                        </div>

                        {orders.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="text-gray-400 italic">
                                    No orders found. Time to go shopping!
                                </p>
                            </div>
                        ) : (
                            <table className="w-full text-left min-w-[500px]">
                                <thead>
                                    <tr className="border-b border-gray-50 text-xs tracking-wider text-gray-400 uppercase">
                                        <th className="pb-4 font-semibold">Order ID</th>
                                        <th className="pb-4 font-semibold">Status</th>
                                        <th className="pb-4 text-right font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="group transition-colors hover:bg-gray-50"
                                        >
                                            <td className="py-4 font-medium text-gray-900">#ORD-{order.id}</td>
                                            <td className="py-4">
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                                    Delivered
                                                </span>
                                            </td>
                                            <td className="py-4 text-right font-bold">${order.total}</td>
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
                                </div>
                            ))}

                            {carts.length > 3 && (
                                <p className="text-center text-xs text-gray-400">
                                    + {carts.length - 3} more items
                                </p>
                            )}

                            <div className="border-t border-gray-100 pt-4">
                                <div className="mb-4 flex justify-between">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-bold text-gray-900">${total}</span>
                                </div>
                                <Link
                                    href="/cart"
                                    className="block w-full rounded-xl bg-gray-900 py-3 text-center font-bold text-white hover:bg-black"
                                >
                                    Review & Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Manage Account Section */}
                <div id="manage-account" className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-bold">Manage Account</h2>
                    <ManageAccountForm user={user} />
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
            active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        }`}
    >
        <div className="flex items-center gap-3">{icon} {label}</div>
        {badge > 0 && (
            <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] text-white">{badge}</span>
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

// --- MANAGE ACCOUNT FORM ---
const ManageAccountForm = ({ user }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/user/update', {
            onSuccess: () => alert('Account updated successfully!'),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                />
            </div>

            <button
                type="submit"
                disabled={processing}
                className="rounded-lg bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
                Update Account
            </button>
        </form>
    );
};

export default UserDashboard;