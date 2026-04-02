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
} from 'react-icons/fa';

export default function Dashboard({ children }: PropsWithChildren) {
  const { url } = usePage();
  const { auth }: any = usePage().props;

  const avatarName = auth.user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [activities, setActivities] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchData = () => {
    router.get(
      '/admin/stats',
      {},
      {
        preserveState: true,
        onSuccess: (page) => {
          setStats(page.props.stats || {});
          setActivities(page.props.activities || []);
          setUsers((page.props.users || []).filter((u: any) => !u.is_admin));
        },
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isActive = (path: string) => url === path;

  const deleteUser = (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    router.delete(`/admin/users/${id}`, {
      onSuccess: (page) => {
        setUsers((page.props.users || []).filter((u: any) => !u.is_admin));
        setActivities(page.props.activities || []);
      },
    });
  };

  const toggleBan = (user: any) => {
    router.post(`/admin/users/${user.id}/toggle-ban`, {
      onSuccess: (page) => {
        setUsers((page.props.users || []).filter((u: any) => !u.is_admin));
        setActivities(page.props.activities || []);
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-md shadow-md"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 border-r border-gray-200 bg-white transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-6">
          <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-xl font-extrabold text-transparent">
            ShopWithOlamide
          </h1>
          <p className="mt-1 text-[8px] uppercase tracking-[0.35em] text-gray-400 font-bold">
            Admin Control Panel
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <AdminNavItem href="/admin" icon={<FaChartPie />} label="Overview" active={isActive('/admin')} />
          <AdminNavItem href="/admin/products" icon={<FaBoxOpen />} label="Manage Products" active={isActive('/admin/products')} />
          <AdminNavItem href="/admin/users" icon={<FaUsers />} label="Customer Base" active={isActive('/admin/users')} />
          <AdminNavItem href="/admin/manage-users" icon={<FaUserSlash />} label="Manage Users" active={isActive('/admin/manage-users')} />
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 w-fit px-4 py-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <FaArrowLeft className="text-xs" /> Storefront
          </Link>
          <button
            onClick={() => router.post('/logout')}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-25 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className={`flex-1 transition-all duration-300 p-4 md:p-8 ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 rounded-full bg-white border border-gray-200 px-4 py-2 shadow-sm w-full md:w-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              {avatarName}
            </div>
            <span className="text-sm font-semibold text-gray-700 truncate">{auth.user.name}</span>
          </div>
        </div>

        {React.isValidElement(children) &&
          React.cloneElement(children, { stats, activities, users, deleteUser, toggleBan })}
      </main>
    </div>
  );
}

const AdminNavItem = ({ href, icon, label, active }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
      active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    {icon} {label}
  </Link>
);