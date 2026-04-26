import { router, usePage } from '@inertiajs/react';

export default function OrdersComponent() {
    const naira = (amount: number) =>
        `₦${Number(amount).toLocaleString('en-NG')}`;
    const { orders }: any = usePage().props;

    const back = () => {
        router.get('/dashboard');
    };

    const statusClasses: Record<string, string> = {
        pending:   'text-yellow-700 bg-yellow-100',
        shipped:   'text-blue-700 bg-blue-100',
        delivered: 'text-green-700 bg-green-100',
        cancelled: 'text-red-700 bg-red-100',
        paid:      'text-purple-700 bg-purple-100',
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        const intervals: [number, string][] = [
            [31536000, 'year'],
            [2592000,  'month'],
            [86400,    'day'],
            [3600,     'hour'],
            [60,       'minute'],
            [1,        'second'],
        ];
        for (const [secs, label] of intervals) {
            const value = Math.floor(seconds / secs);
            if (value >= 1) return `${value} ${label}${value !== 1 ? 's' : ''} ago`;
        }
        return 'just now';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Orders
                        </h1>
                        <p className="mt-1 text-gray-500">
                            View all your previous purchases.
                        </p>
                    </div>
                    <button
                        onClick={back}
                        className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
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
                                            Order #ORD-{order.id}{' '}
                                            {order.status === 'delivered' && 'Completed'}
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            Placed {formatTimeAgo(order.created_at)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`rounded-full px-4 py-1 text-sm font-semibold capitalize ${statusClasses[order.status] || 'bg-gray-100 text-gray-700'}`}
                                        >
                                            {order.status}
                                        </span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {naira(order.total)}
                                        </span>
                                    </div>
                                </div>

                                {order.items.length === 0 ? (
                                    <p className="text-sm italic text-gray-400">
                                        Items no longer available.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {order.items.map((item: any) => (
                                            item.product && (
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
                                                            Qty: {item.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="font-bold text-gray-900">
                                                        {naira(item.price)}
                                                    </p>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}