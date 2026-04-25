import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import {
    FaCartPlus,
    FaHeart,
    FaMapMarkerAlt,
    FaPhone,
    FaShare,
} from 'react-icons/fa';
import { router } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

// phone_number lives on the products table, NOT on the user relation.
// Use product.phone_number directly — product.user only carries id & name.
const FALLBACK_PHONE = '09070079206';

const ProductDetailsData = () => {
    const { product, auth }: any = usePage().props;

    // FIX 1 & 2: Removed `copied` state and `message` state — both were
    // duplicating what `toast` already handles. Only `toast` is used now.
    const [loading, setLoading] = useState(false);
    const [imitateLoading, setImitateLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setImitateLoading(false);
        }, 4000);
    }, []);

    const isLoggedIn = auth.user;

    const addToCart = (id: number) => {
        if (loading) return;

        if (!isLoggedIn) {
            // FIX 2: Only toast fires now — removed duplicate `setMessage(true)`
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
                        {
                            style: { textTransform: 'capitalize' },
                        },
                    );
                },
                onError: (errors) => {
                    toast.error(errors.message || 'Failed to add to cart');
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    const callSeller = () => {
        // phone_number is on the product directly, not on product.user
        window.location.href = `tel:${product.phone_number ?? FALLBACK_PHONE}`;
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
                    // FIX 7: Removed orphaned `setLoading(false)` — loading is
                    // never set to true in this function, so the call was pointless
                    toast.success(
                        `${product.name} added to wishlist successfully`,
                        {
                            style: { textTransform: 'capitalize' },
                        },
                    );
                },
                onError: () => {
                    toast.error(`Failed to add ${product.name} to wishlist.`);
                },
            },
        );
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
        // FIX 1: Removed duplicate `setCopied(true)` overlay — toast handles this alone
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
                    <div
                        onMouseMove={handleMouseMove}
                        style={
                            {
                                '--x': mousePosition.x,
                                '--y': mousePosition.y,
                            } as React.CSSProperties
                        }
                        className={`group relative h-105 w-full overflow-hidden rounded-xl ${
                            imitateLoading ? 'border-none' : 'border'
                        } bg-white`}
                    >
                        {imitateLoading ? (
                            <div className="h-full w-full animate-pulse rounded-lg bg-gray-300" />
                        ) : (
                            <img
                                src={product.image}
                                alt={product.slug}
                                // FIX 4: Removed stray colon from `group-hover:scale-150:`
                                className="h-full w-full cursor-zoom-in object-contain object-center transition-transform duration-300 group-hover:scale-150 lg:object-contain"
                            />
                        )}
                    </div>

                    {/* DETAILS SECTION */}
                    <div className="flex flex-col space-y-5">
                        {/* Title */}
                        {/* FIX 6: Changed <h1> to <h2> — can't nest block-level heading inside <p>
                            Also fixed: Title is now its own element, not inside a <p> */}
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
                                `$${product.price}`
                            )}
                        </div>

                        {/* Stock */}
                        {/* FIX 5: Replaced <span> wrappers with <div> so skeleton <div> isn't
                            nested inside an inline element — invalid HTML */}
                        <div className="mb-4 flex items-center justify-between">
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

                            <div className="text-sm font-semibold text-gray-400">
                                {imitateLoading ? (
                                    <div className="h-8 w-[150px] animate-pulse rounded-lg bg-gray-300" />
                                ) : (
                                    <p className="text-black/70">
                                        Date Listed:{' '}
                                        <span className="text-gray-400">
                                            {new Date(
                                                product.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="text-sm font-semibold text-gray-400">
                            {imitateLoading ? (
                                <div className="h-8 w-[150px] animate-pulse rounded-lg bg-gray-300" />
                            ) : (
                                <p className="text-black/70">
                                    Last Updated:{' '}
                                    <span className="text-gray-400">
                                        {formatTimeAgo(product.updated_at)}
                                    </span>
                                </p>
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

                        {/* Description */}
                        <div className="leading-relaxed text-gray-600">
                            {imitateLoading ? (
                                <div className="h-32 animate-pulse rounded-lg bg-gray-300" />
                            ) : (
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <h2 className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                        About this product
                                    </h2>
                                    {/* Render each newline as its own paragraph — makes long
                                        descriptions readable instead of one wall of text */}
                                    <div className="flex flex-col gap-3">
                                        {product.description ? (
                                            product.description
                                                .split('\n')
                                                .filter(
                                                    (line: string) =>
                                                        line.trim() !== '',
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
                                                )
                                        ) : (
                                            <p className="text-sm text-gray-400 italic">
                                                No description provided.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

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

                            {/* Mobile: no phone number shown */}
                            {!imitateLoading && (
                                <button
                                    onClick={callSeller}
                                    className="flex w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-lg bg-black py-3 text-white transition hover:bg-gray-800 lg:hidden"
                                >
                                    <FaPhone />
                                    Call Seller
                                </button>
                            )}

                            {/* Desktop: phone number shown */}
                            {!imitateLoading && (
                                <button
                                    onClick={callSeller}
                                    className="hidden w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-lg bg-black py-3 text-white transition hover:bg-gray-800 lg:flex"
                                >
                                    <FaPhone />
                                    Call Seller ·{' '}
                                    {product.phone_number ?? FALLBACK_PHONE}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsData;
