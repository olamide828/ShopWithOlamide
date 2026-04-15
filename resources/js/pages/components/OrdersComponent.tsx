import { Link, usePage } from '@inertiajs/react';

export default function OrdersComponent() {
    const { orders }: any = usePage().props;

    const back = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Orders
                        </h1>
                        <p className="mt-1 text-gray-500">
                            View all your previous purchases.
                        </p>
                    </div>

                    {/* <Link
                        href="/dashboard"
                        className="rounded-xl cursor-pointer bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                        Back to Dashboard
                    </Link> */}
                    <button
                        onClick={back}
                        className="rounded-xl cursor-pointer bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                        Back to Dashboard
                    </button>
                </div>

                {orders.length === 0 ? (
                    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                        <p className="text-lg text-gray-400">
                            You haven't placed any orders yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order: any) => (
                            <div
                                key={order.id}
                                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                            >
                                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Order #ORD-{order.id}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700 capitalize">
                                            {order.status}
                                        </span>
                                        <span className="text-lg font-bold text-gray-900">
                                            ${order.total}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {order.items.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 border-t border-gray-100 pt-4"
                                        >
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="h-16 w-16 rounded-xl object-cover"
                                            />

                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="font-bold text-gray-900">
                                                ${item.price}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
