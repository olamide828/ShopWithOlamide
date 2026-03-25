import React from 'react';
import Dashboard from './Home/Dashboard';
import { FaBox, FaUsers, FaChartLine, FaPlus } from 'react-icons/fa';
import { Link, usePage } from '@inertiajs/react';

const DashboardHome = () => {
    const { stats } = usePage().props;

    const statsArray = [
        {
            title: 'Total Products',
            value: stats.products,
            icon: <FaBox />,
            color: 'bg-indigo-600',
        },
        {
            title: 'Total Users',
            value: stats.users,
            icon: <FaUsers />,
            color: 'bg-green-600',
        },
        {
            title: 'Sales',
            value: stats.sales,
            icon: <FaChartLine />,
            color: 'bg-yellow-500',
        },
    ];

    const activities = [
        { text: 'New product added', time: '2 mins ago' },
        { text: 'User registered', time: '10 mins ago' },
        { text: 'Product updated', time: '1 hour ago' },
        { text: 'New order placed', time: '3 hours ago' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-500">
                        Overview of your store performance
                    </p>
                </div>

                <Link
                    href="/dashboard/products"
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                >
                    <FaPlus />
                    Add Product
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {statsArray.map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                        <div>
                            <p className="text-gray-500">{stat.title}</p>
                            <h2 className="text-2xl font-bold">{stat.value}</h2>
                        </div>

                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${stat.color}`}
                        >
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent Activity */}
                <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="mb-4 text-xl font-semibold">
                        Recent Activity
                    </h2>

                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border-b pb-3 last:border-none"
                            >
                                <p className="text-gray-700">{activity.text}</p>
                                <span className="text-sm text-gray-400">
                                    {activity.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">
                        Quick Actions
                    </h2>

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/dashboard/products"
                            className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-white hover:bg-indigo-700"
                        >
                            Manage Products
                        </Link>

                        <Link
                            href="#"
                            className="rounded-lg bg-gray-100 px-4 py-3 text-center hover:bg-gray-200"
                        >
                            View Orders
                        </Link>

                        <Link
                            href="#"
                            className="rounded-lg bg-gray-100 px-4 py-3 text-center hover:bg-gray-200"
                        >
                            Manage Users
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

DashboardHome.layout = (page: any) => <Dashboard>{page}</Dashboard>;

export default DashboardHome;
