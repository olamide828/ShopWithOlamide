import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import {
    FaCartPlus,
    FaHeart,
    FaMapMarkerAlt,
    FaPhone,
    FaShare,
    FaTruck,
} from 'react-icons/fa';
import { router } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

const FALLBACK_PHONE = '09070079206';

const naira = (amount: number) => `₦${Number(amount).toLocaleString('en-NG')}`;

const ProductDetailsData = () => {
    const { product, auth, deliveryFee, freeDeliveryThreshold }: any =
        usePage().props;

    const [loading, setLoading] = useState(false);
    const [imitateLoading, setImitateLoading] = useState(true);

    // State to handle the "Read More" toggle
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setImitateLoading(false);
        }, 4000);
    }, []);

    const isLoggedIn = auth.user;

    const addToCart = (id: number) => {
        if (loading) return;

        if (!isLoggedIn) {
            toast.error('Login to add this product to cart', {
                style: { textTransform: 'capitalize' },
            });
            return;
        }

        if (auth.user?.role === 'admin') {
            toast.error('Admin Cannot Add Product To Cart');
            return;
        }

        setLoading(true);

        router.post(
            '/cart',
            { product_id: id, quantity: 1 },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success(
                        `${product.name} added to cart successfully.`,
                        { style: { textTransform: 'capitalize' } },
                    );
                },
                onError: (errors) => {
                    toast.error(errors.message || 'Failed to add to cart');
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    const addToWishlist = () => {
        if (!auth.user) {
            toast.error('Login to add this product to wishlist', {
                style: { textTransform: 'capitalize' },
            });
            return;
        }

        if (auth.user?.role === 'admin') {
            toast.error('Admin Cannot Add Product To Wishlist');
            return;
        }

        router.post(
            `/wishlist/${product.id}`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success(
                        `${product.name} added to wishlist successfully`,
                        { style: { textTransform: 'capitalize' } },
                    );
                },
                onError: () => {
                    toast.error(`Failed to add ${product.name} to wishlist.`);
                },
            },
        );
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.info('Link copied to clipboard');
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const seconds = Math.floor(
            (new Date().getTime() - date.getTime()) / 1000,
        );
        const intervals: [number, string][] = [
            [31536000, 'year'],
            [2592000, 'month'],
            [86400, 'day'],
            [3600, 'hour'],
            [60, 'minute'],
            [1, 'second'],
        ];
        for (const [secs, label] of intervals) {
            const value = Math.floor(seconds / secs);
            if (value >= 1)
                return `${value} ${label}${value !== 1 ? 's' : ''} ago`;
        }
        return 'just now';
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="capitalize">
                <Head title={`${product.name} - ShopWithOlamide`} />
            </div>

            <Toaster richColors position="bottom-right" />

            <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
                {imitateLoading ? (
                    <div className="mb-3 h-7 animate-pulse rounded-lg bg-gray-300 lg:w-[500px]" />
                ) : (
                    <p className="py-4">
                        Product Listed by:{' '}
                        <span className="font-semibold">
                            {product.user?.name ?? 'Management'}
                        </span>
                        {product.user?.name && ', an Admin.'}
                    </p>
                )}

                <div className="grid gap-10 lg:grid-cols-2">
                    {/* IMAGE SECTION */}
                    <div className="relative w-full overflow-hidden rounded-xl bg-white">
                        {imitateLoading ? (
                            <div className="h-72 w-full animate-pulse rounded-xl bg-gray-300 lg:h-105" />
                        ) : (
                            <img
                                src={product.image}
                                alt={product.slug}
                                className="h-72 w-full object-contain lg:h-105 lg:cursor-zoom-in lg:transition-transform lg:duration-300 lg:hover:scale-110"
                            />
                        )}
                    </div>

                    {/* DETAILS SECTION */}
                    <div className="flex flex-col space-y-5">
                        {/* Title */}
                        {imitateLoading ? (
                            <div className="h-8 animate-pulse rounded-lg bg-gray-300" />
                        ) : (
                            <h1 className="text-2xl font-semibold text-gray-900 capitalize">
                                {product.name}
                            </h1>
                        )}

                        {/* Price */}
                        <div className="text-2xl font-bold text-indigo-600">
                            {imitateLoading ? (
                                <div className="h-8 w-[150px] animate-pulse rounded-lg bg-gray-300" />
                            ) : (
                                `${naira(product.price)}`
                            )}
                        </div>

                        {/* Stock */}
                        <div className="text-sm">
                            {imitateLoading ? (
                                <div className="h-8 w-[150px] animate-pulse rounded-lg bg-gray-300" />
                            ) : product.stock_quantity > 0 ? (
                                <span className="font-medium text-green-600">
                                    In Stock: {product.stock_quantity}
                                </span>
                            ) : (
                                <span className="font-medium text-red-500">
                                    Out of stock
                                </span>
                            )}
                        </div>

                        <div className="m-0 border-t pt-4" />

                        {/* Location */}
                        {!imitateLoading && product.location && (
                            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2.5 text-sm text-gray-700">
                                <FaMapMarkerAlt className="shrink-0 text-indigo-500" />
                                <span className="font-medium text-gray-500">
                                    Location:
                                </span>
                                <span className="capitalize">
                                    {product.location}
                                </span>
                            </div>
                        )}

                        {/* Description Section with Read More Logic */}
                        <div className="leading-relaxed text-gray-600">
                            {imitateLoading ? (
                                <div className="h-32 animate-pulse rounded-lg bg-gray-300" />
                            ) : (
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <h2 className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                        About this product
                                    </h2>
                                    <div className="flex flex-col gap-3">
                                        {product.description ? (
                                            <>
                                                {product.description
                                                    .split('\n')
                                                    .filter(
                                                        (line: string) =>
                                                            line.trim() !== '',
                                                    )
                                                    // Truncate logic: slice the array based on toggle state
                                                    .slice(
                                                        0,
                                                        showFullDescription
                                                            ? undefined
                                                            : 3,
                                                    )
                                                    .map(
                                                        (
                                                            paragraph: string,
                                                            i: number,
                                                        ) => (
                                                            <p
                                                                key={i}
                                                                className="text-sm leading-relaxed text-gray-600"
                                                            >
                                                                {paragraph}
                                                            </p>
                                                        ),
                                                    )}

                                                {/* Only show "Read More" button if description is longer than 3 lines */}
                                                {product.description
                                                    .split('\n')
                                                    .filter(
                                                        (l: string) =>
                                                            l.trim() !== '',
                                                    ).length > 3 && (
                                                    <button
                                                        onClick={() =>
                                                            setShowFullDescription(
                                                                !showFullDescription,
                                                            )
                                                        }
                                                        className="mt-1 w-fit text-left text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-800"
                                                    >
                                                        {showFullDescription
                                                            ? 'Show Less'
                                                            : 'Read More...'}
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <p className="text-sm text-gray-400 italic">
                                                No description provided.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Date info */}
                        {!imitateLoading && (
                            <div className="space-y-0.5 border-t border-gray-100 pt-3">
                                <p className="text-xs text-black/60">
                                    Date Listed:{' '}
                                    <span className="text-gray-400">
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </span>
                                </p>
                                <p className="text-xs text-black/60">
                                    Last Updated:{' '}
                                    <span className="text-gray-400">
                                        {formatTimeAgo(product.updated_at)}
                                    </span>
                                </p>
                            </div>
                        )}


                        {!imitateLoading && (
                            <div className="flex items-start gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
                                <FaTruck className="mt-0.5 shrink-0 text-indigo-500" />
                                <div>
                                    <p className="font-semibold">
                                        Delivery Info
                                    </p>
                                    <p className="mt-0.5 text-indigo-700">
                                        Flat delivery fee of{' '}
                                        <span className="font-bold">
                                            {naira(deliveryFee)}
                                        </span>
                                        . Orders above{' '}
                                        <span className="font-bold">
                                            {naira(freeDeliveryThreshold)}
                                        </span>{' '}
                                        qualify for{' '}
                                        <span className="font-bold text-green-700">
                                            free delivery
                                        </span>
                                        .
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col gap-3 pt-4">
                            <button
                                onClick={addToWishlist}
                                className={`flex w-full ${
                                    auth.user?.role === 'admin'
                                        ? 'cursor-not-allowed bg-gray-300 text-black'
                                        : 'cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700'
                                } flex-row items-center justify-center gap-3 rounded-lg py-3 font-medium transition`}
                            >
                                <FaHeart />
                                Add To Wishlist
                            </button>

                            <button
                                disabled={product.stock_quantity <= 0}
                                onClick={() => addToCart(product.id)}
                                className={`flex w-full items-center justify-center gap-3 rounded-lg py-3 transition ${
                                    product.stock_quantity === 0 ||
                                    auth.user?.role === 'admin'
                                        ? 'cursor-not-allowed bg-gray-300'
                                        : 'cursor-pointer border hover:bg-gray-100'
                                }`}
                            >
                                <FaCartPlus />
                                {product.stock_quantity <= 0
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

                            {!imitateLoading && (
                                <a
                                    href={`tel:${product.phone_number ?? FALLBACK_PHONE}`}
                                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-green-500 bg-green-100 py-3 font-medium text-green-800 transition hover:bg-green-200 lg:hidden"
                                >
                                    <FaPhone />
                                    Call Seller
                                </a>
                            )}

                            {!imitateLoading && (
                                <a
                                    href={`tel:${product.phone_number ?? FALLBACK_PHONE}`}
                                    className="hidden w-full items-center justify-center gap-3 rounded-lg border border-green-500 bg-green-100 py-3 font-medium text-green-800 transition hover:bg-green-200 lg:flex"
                                >
                                    <FaPhone />
                                    Call Seller ·{' '}
                                    {product.phone_number ?? FALLBACK_PHONE}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsData;
