import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { FaTrash, FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa';
import emptyCart from '/public/empty_cart.png';
import sadEmoji from '/public/sad_emoji.png';
// import Dashboard from '../Home/Dashboard';
// import DashboardHome from '../DashboardHome';
import UserDashboard from '../UserDashboard';
import { toast, Toaster } from 'sonner';

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const { carts, total, auth }: any = usePage().props;
    const isUserTrue = auth.user;
    // `/cart/update/${id}`,

    const updateQuantity = (
        cartId: number,
        newQty: number,
        availableStock: number,
    ) => {
        if (newQty > availableStock + currentQty) {
            toast.error(`Only ${availableStock} more available`);
            return;
        }

        router.put(
            `/cart/update/${cartId}`,
            { quantity: newQty },
            {
                preserveScroll: true,
                preserveState: false,
            },
        );
    };
    // const reloadCart = () => {
    //     window.location.reload();
    // };

    const removeItem = (id: number) => {
        router.delete(`/cart/${id}`, {
            onSuccess: () => {
                toast.success('removed to cart');
            },
        });
        // setTimeout(() => {
        //     reloadCart();
        // }, 500);
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const seconds = Math.floor(
            (new Date().getTime() - date.getTime()) / 1000,
        );

        let interval = seconds / 31536000;
        if (interval >= 1) {
            const value = Math.floor(interval);
            return value === 1 ? '1 year ago' : value + ' years ago';
        }

        interval = seconds / 2592000;
        if (interval >= 1) {
            const value = Math.floor(interval);
            return value === 1 ? '1 month ago' : value + ' months ago';
        }

        interval = seconds / 86400;
        if (interval >= 1) {
            const value = Math.floor(interval);
            return value === 1 ? '1 day ago' : value + ' days ago';
        }

        interval = seconds / 3600;
        if (interval >= 1) {
            const value = Math.floor(interval);
            return value === 1 ? '1 hour ago' : value + ' hours ago';
        }

        interval = seconds / 60;
        if (interval >= 1) {
            const value = Math.floor(interval);
            return value === 1 ? '1 minute ago' : value + ' minutes ago';
        }

        const value = Math.floor(seconds);
        return value === 1 ? '1 second ago' : value + ' seconds ago';
    };

    return (
        <>
            <Toaster richColors position="top-right" />

            {isUserTrue ? (
                <>
                    <div className="min-h-screen bg-gray-50 p-6">
                        <h1 className="mb-6 text-center text-3xl font-bold">
                            Your Cart
                        </h1>

                        {carts.length === 0 ? (
                            <div className="m-auto w-fit flex flex-col items-center justify-center">
                                <div className='relative'>
                                    <div className='absolute bg-white/5 inset-0'></div>
                                    <img
                                    src={emptyCart}
                                    alt="empty_cart"
                                    className="ml-16"
                                />
                                </div>
                                <Link href="/shop/u/products">
                                    <button className="group flex h-14 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(99,102,241,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(99,102,241,0.45)]">
                                        Your cart is empty, Shop now.
                                        <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid gap-6 lg:grid-cols-3">
                                {/* CART ITEMS */}
                                <div className="space-y-4 lg:col-span-2">
                                    {carts.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 rounded-xl bg-white p-4 shadow"
                                        >
                                            <img
                                                alt={item.product.slug}
                                                src={item.product.image}
                                                className="h-24 w-24 rounded-lg object-cover"
                                            />

                                            <div className="flex-1">
                                                <h2 className="font-semibold">
                                                    {item.product.name}
                                                </h2>

                                                <p className="text-gray-500">
                                                    ${item.price}
                                                </p>

                                                {/* QUANTITY */}
                                                <div className="mt-2 flex items-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity -
                                                                    1,
                                                                item.product
                                                                    .stock_quantity,
                                                            )
                                                        }
                                                        disabled={
                                                            item.product
                                                                .stock_quantity <=
                                                            0
                                                        }
                                                        className="cursor-pointer rounded bg-gray-200 p-2"
                                                    >
                                                        <FaMinus />
                                                    </button>

                                                    <span>{item.quantity}</span>

                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1,
                                                                item.product
                                                                    .stock_quantity,
                                                            )
                                                        }
                                                        disabled={
                                                            item.product
                                                                .stock_quantity <=
                                                            0
                                                        }
                                                        className="cursor-pointer rounded bg-gray-200 p-2"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* TOTAL */}
                                            <div className="text-right">
                                                <p className="font-bold">
                                                    $
                                                    {item.price * item.quantity}
                                                </p>

                                                <button
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="mt-2 cursor-pointer text-red-500"
                                                >
                                                    <FaTrash />
                                                </button>
                                                <p>
                                                    {formatTimeAgo(
                                                        item.created_at,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* SUMMARY */}
                                <div className="h-fit rounded-xl bg-white p-6 shadow">
                                    <h2 className="mb-4 text-xl font-bold">
                                        Order Summary
                                    </h2>

                                    <div className="mb-10 flex flex-col gap-3">
                                        {carts.map((item: any) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow"
                                            >
                                                <div className="flex-1">
                                                    <h2 className="font-semibold">
                                                        {item.product.name}
                                                    </h2>

                                                    <p className="text-gray-500">
                                                        ${item.price}
                                                    </p>
                                                </div>

                                                {/* TOTAL */}
                                                <div className="text-right">
                                                    <p className="font-bold">
                                                        $
                                                        {item.price *
                                                            item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mb-2 flex justify-between">
                                        <span>Total</span>
                                        <span className="font-bold">
                                            ${total}
                                        </span>
                                    </div>

                                    <button
                                        disabled={loading}
                                        onClick={() => router.post('/checkout')}
                                        className={`mt-4 w-full cursor-pointer rounded-lg ${loading && 'cursor-not-allowed opacity-25'} bg-indigo-600 py-2 text-white hover:bg-indigo-700`}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="px-10 py-6">
                    <h1 className="mb-6 text-center text-3xl font-bold">
                        Your Cart
                    </h1>
                    <div className="flex flex-col items-center justify-center">
                        <img src={sadEmoji} alt="sad_emoji" />
                        <p className="mb-8 font-semibold">
                            You are currently logged out
                        </p>
                        <Link href="/login">
                            <button className="flex w-fit cursor-pointer items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg">
                                Login to view your cart
                                <FaArrowRight className="ml-1" />
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

Cart.layout = (page: any) => <UserDashboard>{page}</UserDashboard>;

export default Cart;
