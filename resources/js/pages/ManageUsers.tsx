import React from 'react';
import { FaBan, FaTrash, FaUserShield } from 'react-icons/fa';
import Dashboard from './Home/Dashboard';
import { Head, router, usePage } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

const ManageUsers = ({ users }: any) => {
    // logged-in admin
    const { user: admin }: any = usePage().props || {};

    // Delete a user by ID
    const handleDelete = (id: number) => {
        router.delete(`/admin/delete/users/${id}`, {
            onSuccess: () => router.visit('/admin/manage-users'),
        });
    };

    const toggleBan = (user: any) => {
        router.post(
            `/admin/users/${user.id}/toggle-ban`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        user.is_banned ? 'User unbanned' : 'User banned',
                    );
                },
            },
        );
    };

    return (
        <div className="space-y-6">
            <Toaster richColors position="top-right" />
            <Head title="Admin User Management - ShopWithOlamide"></Head>

            <header>
                <h1 className="text-center text-2xl font-bold text-gray-900 md:text-left">
                    User Management
                </h1>
                <p className="text-center text-sm text-gray-500 md:text-left">
                    Control user access and permissions.
                </p>
            </header>

            {/* Main Container */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                {users.length === 0 ? (
                    <div className="p-20 text-center">
                        <FaUserShield className="mx-auto mb-4 text-4xl text-gray-200" />
                        <p className="text-gray-400 italic">
                            No registered customers found.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Desktop View: Table */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full border-collapse text-left">
                                <thead className="bg-gray-50/50 text-[11px] tracking-widest text-gray-500 uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">
                                            User Details
                                        </th>

                                        <th className="px-6 py-4 text-center font-bold">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right font-bold">
                                            Actions
                                        </th>
                                        {/* <th className="px-6 py-4 text-right font-bold">
                                            Acc Type
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="transition-colors hover:bg-gray-50/30"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {user.email}{' '}
                                                    <span className="font-semibold">
                                                        {user.role}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase ${
                                                        user.is_banned
                                                            ? 'bg-red-100 text-red-600'
                                                            : 'bg-green-100 text-green-600'
                                                    }`}
                                                >
                                                    {user.is_banned
                                                        ? 'Banned'
                                                        : 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        disabled={
                                                            (admin &&
                                                                user.id ===
                                                                    admin.id) ||
                                                            user.role ===
                                                                'admin'
                                                        }
                                                        onClick={() =>
                                                            toggleBan(user)
                                                        }
                                                        className="flex items-center gap-1.5 rounded-lg border border-yellow-100 px-3 py-1.5 text-xs font-bold text-yellow-600 transition-all hover:bg-yellow-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <FaBan />{' '}
                                                        {user.is_banned
                                                            ? 'Unban'
                                                            : 'Ban'}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id,
                                                            )
                                                        }
                                                        disabled={
                                                            (admin &&
                                                                user.id ===
                                                                    admin.id) ||
                                                            user.role ===
                                                                'admin'
                                                        } // cannot delete self
                                                        className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-600 transition-all hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <FaTrash /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                            {/* <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">
                                                    {user.role}
                                                </div>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View: Cards */}
                        <div className="grid grid-cols-1 divide-y divide-gray-100 md:hidden">
                            {users.map((user) => (
                                <div key={user.id} className="space-y-4 p-5">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <p className="leading-tight font-bold text-gray-900">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {user.email} &nbsp;
                                                <span className="font-semibold text-black/40 capitalize">
                                                    {user.role}
                                                </span>
                                            </p>
                                        </div>
                                        <span
                                            className={`rounded-full px-2 py-1 text-[9px] font-black uppercase ${
                                                user.is_banned
                                                    ? 'bg-red-50 text-red-600'
                                                    : 'bg-green-50 text-green-600'
                                            }`}
                                        >
                                            {user.is_banned
                                                ? 'Banned'
                                                : 'Active'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            disabled={user.role === 'admin'}
                                            onClick={() => toggleBan(user)}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-50 py-3 text-xs font-bold text-yellow-700 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <FaBan />{' '}
                                            {user.is_banned ? 'Unban' : 'Ban'}
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            disabled={
                                                (admin &&
                                                    user.id === admin.id) ||
                                                user.role === 'admin'
                                            }
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-xs font-bold text-red-700 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

ManageUsers.layout = (page: any) => <Dashboard>{page}</Dashboard>;
export default ManageUsers;
