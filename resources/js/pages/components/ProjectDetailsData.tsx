import React, { useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';
import {
    FaCartPlus,
    FaClipboard,
    FaClipboardCheck,
    FaHeart,
    FaMoneyBill,
    FaRegClipboard,
    FaShare,
    FaTimes,
} from 'react-icons/fa';
import { router } from '@inertiajs/react';

const ProductDetailsData = () => {
    const { product, auth }: any = usePage().props;

    const [copied, setCopied] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [message, setMessage] = useState(false);

    const isLoggedIn = auth.user;

    const [loading, setLoading] = useState(false);

    // const addToWishlist = () => {
    //     router.post(`/wishlist/${product.id}`, {
    //      onSuccess: => {
    //         setToast("Product added to wishlist successfully");
    //      }
    //     })
    // }

    const addToCart = (id: number) => {
    if (loading) return;
    if (!isLoggedIn) {
        setMessage(true);
        setTimeout(() => setMessage(false), 3000);
        return;
    }

    setLoading(true);

    router.post('/cart', { product_id: id }, {
        preserveScroll: true,
        preserveState: false, // ⚠️ change this 
        onSuccess: (page) => {
            setLoading(false);
        },
    });
};

    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
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
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            {/* Toast */}
            {copied && (
                <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-black px-5 py-2 text-sm text-white shadow-lg">
                    <FaClipboardCheck /> Link copied successfully
                </div>
            )}

            {toast && (
                <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-black px-5 py-2 text-sm text-white shadow-lg">
                    {toast}
                </div>
            )}

            {message && (
                <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-black px-5 py-2 text-sm text-white shadow-lg">
                    <FaTimes /> Log In to add to cart
                </div>
            )}

            <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
                <div className="grid gap-10 lg:grid-cols-2">
                    {/* IMAGE SECTION */}
                    <div
                        onMouseMove={handleMouseMove}
                        style={
                            {
                                '--x': mousePosition.x,
                                '--y': mousePosition.y,
                            } as React.CSSProperties
                        }
                        className="group relative h-105 w-full overflow-hidden rounded-xl border bg-white"
                    >
                        {/* Base Image */}
                        <img
                            src={product.image}
                            alt={product.slug}
                            className="group-hover:scale-150: h-full w-full cursor-zoom-in object-contain object-center lg:object-contain"
                        />

                        {/* Zoom Overlay */}
                    </div>

                    {/* DETAILS SECTION */}
                    <div className="flex flex-col space-y-5">
                        {/* Title */}
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="text-2xl font-bold text-indigo-600">
                            ${product.price}
                        </div>

                        {/* Stock */}
                        <div className="mb-4 flex items-center justify-between">
                            <div className="text-sm">
                                {product.stock_quantity > 0 ? (
                                    <span className="font-medium text-green-600">
                                        In Stock: {product.stock_quantity}
                                    </span>
                                ) : (
                                    <span className="font-medium text-red-500">
                                        Out of Stock: {product.stock_quantity}
                                    </span>
                                )}
                            </div>

                            <div className="text-sm font-semibold text-gray-400">
                                <p className="text-black/70">
                                    Date Listed:{' '}
                                    <span className="text-gray-400">
                                        {formatTimeAgo(product.created_at)}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-400">
                            <p className="text-black/70">
                                Last Updated:{' '}
                                <span className="text-gray-400">
                                    {formatTimeAgo(product.updated_at)}
                                </span>
                            </p>
                        </div>
                        {/* Divider */}
                        <div className="m-0 border-t pt-4" />

                        {/* Description */}
                        <p className="m-0 leading-relaxed text-gray-600">
                            {product.description}
                        </p>
       
                        {/* Actions */}
                        <div className="flex flex-col gap-3 pt-4">
                            <button
                            onClick={() => router.post(`/wishlist/${product.id}`)}
                            className="flex w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700">
                                <FaHeart />
                                Add To Wishlist
                            </button>

                            <button
                                disabled={product.stock_quantity === 0}
                                onClick={() => addToCart(product.id)}
                                className={`flex w-full items-center justify-center gap-3 rounded-lg py-3 transition ${
                                    product.stock_quantity === 0
                                        ? 'cursor-not-allowed bg-gray-300'
                                        : 'cursor-pointer border hover:bg-gray-100'
                                }`}
                            >
                                <FaCartPlus />
                                {product.stock_quantity === 0
                                    ? 'Out of Stock'
                                    : 'Add to Cart'}
                            </button>

                            <button
                                onClick={copyLink}
                                className="flex w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-lg bg-black py-3 text-white transition hover:bg-gray-800"
                            >
                                <FaShare />
                                Share Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsData;
