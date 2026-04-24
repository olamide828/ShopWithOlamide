import Dashboard from '@/pages/Home/Dashboard';
import { router } from '@inertiajs/react';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa'; // Added for the dropdown icon
import { toast, Toaster } from 'sonner';

const AdminOrder = ({ orders }: any) => {
    return (
        <div className="p-4 md:p-6">
            <Toaster richColors position="top-right" />

            <h1 className="mb-6 text-xl md:text-2xl font-bold">All Orders</h1>

            <div className="overflow-hidden rounded-lg bg-white shadow">
                {/* Scrollable container for the table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] md:min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Date/Time</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Items</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Total</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.data.map((order: any) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 text-sm font-medium">#{order.id}</td>
                                    <td className="p-3 text-sm">
                                        <div className="font-semibold text-gray-900">{order.user?.name}</div>
                                        <div className="text-xs text-gray-500">{order.user?.email}</div>
                                    </td>
                                    <td className="p-3 text-sm">
                                        <div>{new Date(order.created_at).toLocaleDateString()}</div>
                                        <div className="text-xs font-semibold text-gray-500">
                                            {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="p-3 text-sm">
                                        <div className="max-w-[200px] space-y-1">
                                            {order.items.map((item: any) => (
                                                <div key={item.id} className="truncate text-xs text-gray-600">
                                                    {item.product.name} <span className="font-bold">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-3 text-sm font-bold text-gray-900">${order.total}</td>
                                    <td className="p-3 text-sm">
                                        {/* Status Dropdown Container */}
                                        <div className="relative group min-w-[120px]">
                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    router.patch(
                                                        `/admin/orders/${order.id}`,
                                                        { status: e.target.value },
                                                        {
                                                            preserveScroll: true,
                                                            onSuccess: () => toast.success('Status updated'),
                                                            onError: () => toast.error('Status failed to update'),
                                                        }
                                                    )
                                                }
                                                className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            
                                            {/* Custom Dropdown Arrow Icon for Mobile/All Screens */}
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 group-hover:text-gray-600">
                                                <FaChevronDown className="h-3 w-3" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Empty State / Pagination Info */}
                {orders.data.length === 0 && (
                    <div className="p-10 text-center text-gray-500">
                        No orders found.
                    </div>
                )}
            </div>
        </div>
    );
};

AdminOrder.layout = (page: any) => <Dashboard children={page} />;
export default AdminOrder;