import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    FaTrash,
    FaPlus,
    FaMinus,
    FaArrowRight,
    FaTimes,
    FaLock,
    FaCreditCard,
} from 'react-icons/fa';
import emptyCart from '/public/empty_cart.png';
import sadEmoji from '/public/sad_emoji.png';
import UserDashboard from '../UserDashboard';
import { toast, Toaster } from 'sonner';

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { carts, total, auth }: any = usePage().props;
    const isUserTrue = auth.user;

    const [formData, setFormData] = useState({
        email: auth.user?.email || '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    const handleSimulatedPayment = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            router.post(
                '/checkout',
                {},
                {
                    onFinish: () => {
                        setLoading(false);
                        setIsModalOpen(false);
                    },
                    onSuccess: () => toast.success('Payment Successful!'),
                    onError: () => {
                        setLoading(false);
                        toast.error('An error occurred during checkout.');
                    },
                },
            );
        }, 5000);
    };

    // --- UPDATED LOGIC HERE ---
    const updateQuantity = (item: any, newQty: number) => {
        if (newQty < 1) return;

        // Logic: You can only add what is in the cart + what is left in stock
        const maxAvailable = item.quantity + item.product.stock_quantity;

        if (newQty > maxAvailable) {
            toast.error(`Only ${maxAvailable} total units available`);
            return;
        }

        router.put(
            `/cart/${item.id}`,
            { quantity: newQty },
            {
                preserveScroll: true,
                onError: (errors: any) => {
                    if (errors.message) toast.error(errors.message);
                },
            },
        );
    };

    const removeItem = (id: number) => {
        // We pass the explicit ID to match our Controller's fixed destroy method
        router.delete(`/cart/${id}`, {
            onSuccess: () => toast.success('Removed from cart'),
            onError: () => toast.error('Could not remove item.'),
        });
    };
    // --- END UPDATED LOGIC ---

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const seconds = Math.floor(
            (new Date().getTime() - date.getTime()) / 1000,
        );
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        return `${Math.floor(minutes / 60)}h ago`;
    };

    return (
        <>
            <Toaster richColors position="top-right" />

            {/* --- CHECKOUT MODAL (UNCHANGED UI) --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                        <div className="flex items-center justify-between bg-gray-900 px-6 py-4 text-white">
                            <div className="flex items-center gap-2">
                                <FaCreditCard className="text-indigo-400" />
                                <h3 className="font-bold">Payment Details</h3>
                            </div>
                            <button
                                onClick={() =>
                                    !loading && setIsModalOpen(false)
                                }
                                className="cursor-pointer text-gray-400 transition-colors hover:text-white"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSimulatedPayment} className="p-6">
                            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[13px] text-amber-800">
                                <p className="flex items-start gap-2">
                                    <span className="mt-0.5">💡</span>
                                    <span>
                                        <strong>Test Mode:</strong> Simulation
                                        only.
                                    </span>
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                                        Email
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                                        Card Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Full Name"
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        required
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-full rounded-lg border p-2.5"
                                    />
                                    <input
                                        required
                                        type="text"
                                        placeholder="CVC"
                                        className="w-full rounded-lg border p-2.5"
                                    />
                                </div>
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="mt-8 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg disabled:opacity-80"
                            >
                                {loading
                                    ? 'Processing...'
                                    : `Complete Order ($${total})`}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- CART UI (UNCHANGED UI) --- */}
            {isUserTrue ? (
                <div className="min-h-screen bg-gray-50 p-6">
                    <h1 className="mb-6 text-center text-3xl font-bold">
                        Your Cart
                    </h1>
                    {carts.length === 0 ? (
                        <div className="m-auto flex w-fit flex-col items-center justify-center">
                            <img
                                src={emptyCart}
                                alt="empty_cart"
                                className="ml-16"
                            />
                            <Link href="/shop/u/products">
                                <button className="group flex h-14 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02]">
                                    Your cart is empty, Shop now.{' '}
                                    <FaArrowRight />
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="space-y-4 lg:col-span-2">
                                {carts.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                                    >
                                        <img
                                            alt={item.product.name}
                                            src={item.product.image}
                                            className="h-24 w-24 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h2 className="font-semibold text-gray-800">
                                                {item.product.name}
                                            </h2>
                                            <p className="font-medium text-indigo-600">
                                                ${item.price}
                                            </p>
                                            <div className="mt-3 flex items-center gap-3">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item,
                                                            item.quantity - 1,
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity <= 1
                                                    }
                                                    className="cursor-pointer rounded-md bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                                                >
                                                    <FaMinus size={12} />
                                                </button>
                                                <span className="w-4 text-center text-sm font-bold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item,
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                    disabled={
                                                        item.product
                                                            .stock_quantity <= 0
                                                    }
                                                    className="cursor-pointer rounded-md bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                                                >
                                                    <FaPlus size={12} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex h-24 flex-col justify-between text-right">
                                            <p className="font-bold text-gray-900">
                                                $
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    removeItem(item.id)
                                                }
                                                className="ml-auto cursor-pointer text-red-400 transition-colors hover:text-red-600"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                            <p className="text-[10px] text-gray-400">
                                                {formatTimeAgo(item.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="h-fit rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-xl font-bold text-gray-800">
                                    Order Summary
                                </h2>
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="font-medium text-gray-600">
                                        Grand Total
                                    </span>
                                    <span className="text-2xl font-bold text-indigo-600">
                                        ${total}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full cursor-pointer rounded-xl bg-gray-900 py-4 font-bold text-white shadow-lg transition-all hover:bg-black"
                                >
                                    Checkout Now
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="px-10 py-6 text-center">
                    <img
                        src={sadEmoji}
                        alt="sad_emoji"
                        className="mx-auto mb-4"
                    />
                    <p className="mb-8 font-semibold text-gray-600">
                        You need to be logged in to view your cart
                    </p>
                    <Link href="/login">
                        <button className="inline-flex items-center gap-3 rounded-2xl bg-indigo-600 px-8 py-3 font-bold text-white shadow-lg transition-all hover:bg-indigo-700">
                            Login to Account <FaArrowRight size={14} />
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
};

Cart.layout = (page: any) => <UserDashboard>{page}</UserDashboard>;
export default Cart;
