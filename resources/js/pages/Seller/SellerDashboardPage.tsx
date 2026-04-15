import React from 'react';
import { FaBoxOpen, FaShoppingCart, FaMoneyBillWave, FaPlus, FaArrowRight, FaClock, FaChartBar } from 'react-icons/fa';
import { Link, Head } from '@inertiajs/react';
import SellerDashboardLayout from '../components/SellerDashboardHome'; // Ensure this path is correct

interface StatProps {
  products: number;
  orders: number;
  revenue: number;
  sold: number;
}

interface Activity {
  text: string;
  time: string;
}

interface Props {
  stats: StatProps;
  activities: Activity[];
}

const SellerDashboardPage = ({ stats, activities }: Props) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Head title="Seller Dashboard" />

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Seller Overview</h1>
          <p className="text-sm text-gray-500">Welcome back! Here is what's happening with your store.</p>
        </div>
        <Link
          href="/seller/products/create"
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
        >
          <FaPlus size={12} /> Add New Product
        </Link>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          label="Products" 
          value={stats.products} 
          icon={<FaBoxOpen />} 
          color="text-blue-600" 
          bgColor="bg-blue-50" 
        />
        <StatCard 
          label="Orders" 
          value={stats.orders} 
          icon={<FaShoppingCart />} 
          color="text-orange-600" 
          bgColor="bg-orange-50" 
        />
        <StatCard 
          label="Items Sold" 
          value={stats.sold} 
          icon={<FaChartBar />} 
          color="text-purple-600" 
          bgColor="bg-purple-50" 
        />
        <StatCard 
          label="Revenue" 
          value={`₦${Number(stats.revenue || 0).toLocaleString()}`} 
          icon={<FaMoneyBillWave />} 
          color="text-emerald-600" 
          bgColor="bg-emerald-50" 
        />
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* RECENT SALES */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Recent Sales Activity</h2>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">Live Update</span>
          </div>
          
          <div className="space-y-6">
            {activities.length > 0 ? (
              activities.map((a, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 rounded-full bg-gray-50 p-2 text-gray-400 group-hover:text-indigo-600 transition-colors">
                    <FaClock size={14} />
                  </div>
                  <div className="flex-1 border-b border-gray-50 pb-4">
                    <p className="text-sm font-semibold text-gray-800">{a.text}</p>
                    <p className="text-xs text-gray-400">{a.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-sm text-gray-400">No sales activity yet. Time to market your products!</p>
              </div>
            )}
          </div>
        </div>

        {/* QUICK ACTIONS & INSIGHTS */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-800">Quick Links</h2>
            <div className="space-y-3">
              <QuickLink href="/seller/products" label="Inventory Manager" />
              <QuickLink href="/seller/orders" label="Process Orders" />
              <QuickLink href="#" label="Revenue Analytics" />
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-xl">
            <h3 className="font-bold mb-2">Seller Tip 💡</h3>
            <p className="text-indigo-100 text-xs leading-relaxed">
              Maintain a high rating by processing orders within 24 hours to gain more visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const StatCard = ({ label, value, icon, color, bgColor }: any) => (
  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
    <div className={`rounded-xl p-4 ${bgColor} ${color} text-xl`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <h3 className="text-2xl font-black text-gray-900">{value ?? 0}</h3>
    </div>
  </div>
);

const QuickLink = ({ href, label }: any) => (
  <Link
    href={href}
    className="flex items-center justify-between w-full rounded-xl border border-gray-50 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-600 group"
  >
    {label}
    <FaArrowRight className="text-[10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
  </Link>
);

// Layout assignment
SellerDashboardPage.layout = (page: React.ReactNode) => (
  <SellerDashboardLayout children={page} />
);

export default SellerDashboardPage;