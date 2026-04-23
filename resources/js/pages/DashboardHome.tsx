import React from 'react';
import {
    FaBox,
    FaUsers,
    FaChartLine,
    FaPlus,
    FaClock,
    FaArrowRight,
    FaChartArea,
    FaDollarSign,
} from 'react-icons/fa';
import { Head, Link, router } from '@inertiajs/react';
import Dashboard from './Home/Dashboard'; // Ensure path is correct

const DashboardHome = ({ stats, activities }) => {
    return (
        <div className="max-w-full space-y-8">
            <Head title="Admin Dashboard Overview - ShopWithOlamide"></Head>
            {/* Header */}
            <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Admin Overview
                    </h1>
                    <p className="text-sm text-gray-500">
                        Real-time metrics for ShopWithOlamide.
                    </p>
                </div>
                <button
                    onClick={() => router.get('/admin/products')}
                    className="flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-indigo-700"
                >
                    <FaPlus /> Add Product
                </button>
            </header>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <AdminStatCard
                    label="Total Products"
                    value={stats?.products || 0}
                    icon={<FaBox className="text-blue-600" />}
                    color="bg-blue-50"
                />
                <AdminStatCard
                    label="Registered Users"
                    value={stats?.users || 0}
                    icon={<FaUsers className="text-purple-600" />}
                    color="bg-purple-50"
                />
                <AdminStatCard
                    label="Monthly Sales"
                    value={`$${stats?.monthlySales || '0.00'}`}
                    icon={<FaChartLine className="text-yellow-600" />}
                    color="bg-yellow-50"
                />
                <AdminStatCard
                    label="Total Sales"
                    value={`$${stats?.sales || '0.00'}`}
                    icon={<FaDollarSign className="text-green-600" />}
                    color="bg-green-50"
                />
            </div>
            {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi at
            asperiores nostrum deleniti, autem tenetur fuga dolore doloremque
            architecto nam nemo totam id eum, ab cupiditate incidunt
            exercitationem nisi nesciunt ratione expedita. Necessitatibus iure
            quibusdam culpa ad quidem enim eius repudiandae, non corporis
            consectetur nemo explicabo vel autem ipsam recusandae. */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Recent Activity */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="mb-6 text-lg font-bold text-gray-800">
                        Recent Activity
                    </h2>
                    <div className="space-y-6">
                        {activities && activities.length > 0 ? (
                            activities.map((activity, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1 rounded-lg bg-gray-50 p-2 text-indigo-600 shadow-sm">
                                        {activity.icon || <FaClock size={14} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">
                                            {activity.message}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 italic">
                                No recent activity found.
                            </p>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-bold text-gray-800">
                        Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <QuickLink
                            href="/admin/manage-users"
                            label="Manage User Access"
                        />
                        <QuickLink
                            href="/admin/products"
                            label="Inventory Control"
                        />
                        <QuickLink href="#" label="Sales Reports" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminStatCard = ({ label, value, icon, color }) => (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className={`rounded-xl p-4 ${color} text-xl`}>{icon}</div>
        <div>
            <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                {label}
            </p>
            <h3 className="text-2xl font-black text-gray-900">{value}</h3>
        </div>
    </div>
);

const QuickLink = ({ href, label }) => (
    <Link
        href={href}
        className="group flex w-full items-center justify-between rounded-xl border border-gray-50 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-600"
    >
        {label}
        <FaArrowRight className="text-[10px] opacity-0 transition-all group-hover:opacity-100" />
    </Link>
);

DashboardHome.layout = (page: any) => <Dashboard children={page} />;
export default DashboardHome;
