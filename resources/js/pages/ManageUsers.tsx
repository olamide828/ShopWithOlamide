import React from 'react';
import {
    FaBan,
    FaTrash,
    FaUserShield,
    FaDesktop,
    FaGlobe,
} from 'react-icons/fa';
import Dashboard from './Home/Dashboard';
import { Head, router, usePage } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

const ManageUsers = ({ users }: any) => {
    const { user: admin }: any = usePage().props || {};

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

    const formatTimeAgo = (dateString: string | null) => {
        if (!dateString) return 'Never logged in';
        const date = new Date(dateString);
        const seconds = Math.floor(
            (new Date().getTime() - date.getTime()) / 1000,
        );
        const intervals: [number, string][] = [
            [31536000, 'year'],
            [2592000, 'month'],
            [86400, 'day'],
            [3600, 'hour'],
            [60, 'minute'],
            [1, 'second'],
        ];
        for (const [secs, label] of intervals) {
            const value = Math.floor(seconds / secs);
            if (value >= 1)
                return `${value} ${label}${value !== 1 ? 's' : ''} ago`;
        }
        return 'Just now';
    };

    return (
        <div className="space-y-6">
            <Toaster richColors position="top-right" />
            <Head title="Admin User Management - ShopWithOlamide" />

            <header>
                <h1 className="text-center text-2xl font-bold text-gray-900 md:text-left">
                    User Management
                </h1>
                <p className="text-center text-sm text-gray-500 md:text-left">
                    Control user access and permissions.
                </p>
            </header>

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
                        {/* Desktop Table */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full border-collapse text-left">
                                <thead className="bg-gray-50/50 text-[11px] tracking-widest text-gray-500 uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">
                                            User Details
                                        </th>
                                        <th className="px-6 py-4 font-bold">
                                            Device Info
                                        </th>
                                        <th className="px-6 py-4 text-center font-bold">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right font-bold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {users.map((user: any) => (
                                        <tr
                                            key={user.id}
                                            className="transition-colors hover:bg-gray-50/30"
                                        >
                                            {/* User Details */}
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
                                                <div className="mt-1 text-[11px] text-gray-400">
                                                    Last seen:{' '}
                                                    {formatTimeAgo(
                                                        user.last_seen_at,
                                                    )}
                                                </div>
                                            </td>

                                            {/* Device Info */}
                                            <td className="px-6 py-4">
                                                {user.last_ip ? (
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                            <FaGlobe
                                                                className="shrink-0 text-indigo-400"
                                                                size={10}
                                                            />
                                                            <span className="font-mono">
                                                                {user.last_ip}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                            <FaDesktop
                                                                className="shrink-0 text-gray-400"
                                                                size={10}
                                                            />
                                                            <span>
                                                                {
                                                                    user.last_device
                                                                }{' '}
                                                                &middot;{' '}
                                                                {user.last_os}
                                                            </span>
                                                        </div>
                                                        <div className="text-[11px] text-gray-400">
                                                            {user.last_browser}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-300 italic">
                                                        No login recorded
                                                    </span>
                                                )}
                                            </td>

                                            {/* Status */}
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

                                            {/* Actions */}
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
                                                        <FaBan />
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
                                                        }
                                                        className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-600 transition-all hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <FaTrash /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="grid grid-cols-1 divide-y divide-gray-100 md:hidden">
                            {users.map((user: any) => (
                                <div key={user.id} className="space-y-3 p-5">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <p className="leading-tight font-bold text-gray-900">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {user.email}&nbsp;
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

                                    {/* Device Info Card */}
                                    {user.last_ip ? (
                                        <div className="space-y-1 rounded-lg bg-gray-50 px-3 py-2">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <FaGlobe
                                                    className="shrink-0 text-indigo-400"
                                                    size={10}
                                                />
                                                <span className="font-mono">
                                                    {user.last_ip}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <FaDesktop
                                                    className="shrink-0 text-gray-400"
                                                    size={10}
                                                />
                                                <span>
                                                    {user.last_device} &middot;{' '}
                                                    {user.last_os} &middot;{' '}
                                                    {user.last_browser}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-gray-400">
                                                Last seen:{' '}
                                                {formatTimeAgo(
                                                    user.last_seen_at,
                                                )}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-300 italic">
                                            No login recorded yet
                                        </p>
                                    )}

                                    <div className="flex gap-2 pt-1">
                                        <button
                                            disabled={user.role === 'admin'}
                                            onClick={() => toggleBan(user)}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-50 py-3 text-xs font-bold text-yellow-700 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <FaBan />
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
