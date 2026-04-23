import Dashboard from '@/pages/Home/Dashboard';
import { router } from '@inertiajs/react';
import React from 'react';
import { toast, Toaster } from 'sonner';

const AdminOrder = ({ orders }: any) => {
    return (
        <div className="p-6">
            <Toaster richColors position="top-right" />

            <h1 className="mb-4 text-2xl font-bold">All Orders</h1>

            <div className="rounded bg-white shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Order ID</th>
                            <th className="p-3 text-left">Customer</th>
                            <th className="p-3 text-left">Date/Time</th>
                            <th className="p-3 text-left">Items</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data.map((order: any) => (
                            <tr key={order.id} className="border-t">
                                <td className="p-3">#{order.id}</td>
                                <td className="p-3">
                                    {order.user?.name} <br />{' '}
                                    <span className="text-xs">
                                        {order.user?.email}
                                    </span>
                                </td>
                                <td className="p-3">
                                    {new Date(
                                        order.created_at,
                                    ).toLocaleDateString()}{' '}
                                    <br />
                                    <span className="text-xs font-semibold">
                                        {new Date(
                                            order.created_at,
                                        ).toLocaleTimeString()}
                                    </span>
                                </td>

                                <td className="p-3">
                                    {order.items.map((item: any) => (
                                        <div key={item.id}>
                                            {item.product.name} x{' '}
                                            {item.quantity}
                                        </div>
                                    ))}
                                </td>
                                <td className="p-3">${order.total}</td>
                                <td className="p-3">
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            router.patch(
                                                `/admin/orders/${order.id}`,
                                                {
                                                    status: e.target.value,
                                                },
                                                {
                                                    preserveScroll: true,
                                                    onSuccess: () =>
                                                        toast.success(
                                                            'Status updated',
                                                        ),
                                                    onError: () => {
                                                        toast.error(
                                                            'Status failed to update',
                                                        );
                                                    },
                                                },
                                            )
                                        }
                                        className="rounded border px-2 py-1"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">
                                            Delivered
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
AdminOrder.layout = (page: any) => <Dashboard children={page} />;
export default AdminOrder;
