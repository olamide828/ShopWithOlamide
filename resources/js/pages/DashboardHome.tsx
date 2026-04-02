import React from 'react';
import {
  FaBox,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaClock,
  FaBan,
  FaTrash,
} from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import Dashboard from './Home/Dashboard';

const DashboardHome = ({ stats, activities, users, deleteUser, toggleBan }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-500">Real-time metrics for your marketplace.</p>
        </div>
        <Link
          href="/admin/products"
          className="flex w-fit items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-indigo-700"
        >
          <FaPlus /> Add Product
        </Link>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <AdminStatCard
          label="Total Products"
          value={stats.products}
          icon={<FaBox className="text-blue-600" />}
          color="bg-blue-50"
        />
        <AdminStatCard
          label="Registered Users"
          value={stats.users}
          icon={<FaUsers className="text-purple-600" />}
          color="bg-purple-50"
        />
        <AdminStatCard
          label="Monthly Sales"
          value={`$${stats.sales}`}
          icon={<FaChartLine className="text-green-600" />}
          color="bg-green-50"
        />
      </div>

      {/* Recent Activity + Quick Management */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-6 text-lg font-bold">Recent Activity</h2>
          <div className="space-y-6">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-1 rounded-lg bg-gray-50 p-2 text-xs">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-400">
                    <FaClock className="text-[10px]" /> {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Management */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Quick Management</h2>
          <div className="space-y-3">
            <QuickLink href="/admin/products" label="Inventory Report" />
            <QuickLink href="/admin/users" label="User Permissions" />
            <QuickLink href="#" label="Sales Analytics" />
            <QuickLink href="#" label="System Settings" />
          </div>
        </div>
      </div>

      {/* Manage Users */}
      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Manage Users</h2>
        {users.length === 0 ? (
          <p className="text-gray-400 italic">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-2 font-semibold text-gray-500">Name</th>
                  <th className="px-4 py-2 font-semibold text-gray-500">Email</th>
                  <th className="px-4 py-2 font-semibold text-gray-500">Status</th>
                  <th className="px-4 py-2 font-semibold text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.is_banned ? 'Banned' : 'Active'}</td>
                    <td className="flex gap-2 px-4 py-3 flex-wrap">
                      <button
                        onClick={() => toggleBan(user)}
                        className="flex items-center gap-1 rounded bg-yellow-50 px-3 py-1 text-yellow-700 hover:bg-yellow-100"
                      >
                        <FaBan /> {user.is_banned ? 'Unban' : 'Ban'}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="flex items-center gap-1 rounded bg-red-50 px-3 py-1 text-red-700 hover:bg-red-100"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminStatCard = ({ label, value, icon, color }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className={`rounded-xl p-4 ${color} text-2xl`}>{icon}</div>
    <div>
      <p className="text-sm font-medium tracking-wider text-gray-500 uppercase">{label}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

const QuickLink = ({ href, label }) => (
  <Link
    href={href}
    className="block w-full rounded-xl border border-gray-50 bg-gray-50/50 px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-600"
  >
    {label}
  </Link>
);

// Wrap page in Dashboard layout
DashboardHome.layout = (page: any) => <Dashboard>{page}</Dashboard>;

export default DashboardHome;