import React, { useEffect, useRef, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
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
import { toast, Toaster } from 'sonner';

const ProductDetailsData = () => {
    const { product, auth }: any = usePage().props;

    const [copied, setCopied] = useState(false);
    // const [toast, setToast] = useState<string | null>(null);
    const [message, setMessage] = useState(false);
    // const [qty, setQty] = useState(1);

    const isLoggedIn = auth.user;

    const [loading, setLoading] = useState(false);

    const [imitateLoading, setImitateLoading] = useState(true);

    useEffect(() => {
        // toast.info("getting ingp");
        setTimeout(() => {
            setImitateLoading(false);
        }, 4000);
    }, []);

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
            toast.error(`Login to add this product to cart`, {
                style: {
                    textTransform: 'capitalize',
                },
            });
            setMessage(true);
            setTimeout(() => setMessage(false), 3000);
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
                onSuccess: (page) => {
                    setLoading(false);
                    toast.success(
                        `${product.name} added to cart successfully.`,
                        {
                            style: {
                                textTransform: 'capitalize',
                            },
                        },
                    );
                },

                onError: (errors) => {
                    setLoading(false);
                    toast.error(errors.message || 'Failed to add to cart');
                },

                onFinish: () => setLoading(false),
            },
        );
    };

    const addToWishlist = () => {
        if (!auth.user) {
            toast.error(`Login to add this product to wishlist`, {
                style: {
                    textTransform: 'capitalize',
                },
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
                    setLoading(false);
                    toast.success(
                        `${product.name} added to wishlist successfully`,
                        {
                            style: {
                                textTransform: 'capitalize',
                            },
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
        toast.info('Link copied to clipboard');
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
            <div className="capitalize">
                <Head title={`${product.name} - ShopWithOlamide`}></Head>
            </div>
            {/* Toast */}
            {copied && (
                <div className="fixed top-6 left-1/2 z-50 flex w-[300px] -translate-x-1/2 items-center gap-3 rounded-lg bg-black px-5 py-2 text-sm text-white shadow-lg">
                    <FaClipboardCheck /> Link copied to clipboard
                </div>
            )}

            <Toaster richColors position="bottom-right" />

            {message && (
                <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-black px-5 py-2 text-sm text-white capitalize shadow-lg">
                    <FaTimes /> Log In to add this product to cart
                </div>
            )}

            <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
                {imitateLoading ? (
                    <div className="mb-3 h-7 animate-pulse rounded-lg bg-gray-300 lg:w-[500px]"></div>
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
                        className={`group relative h-105 w-full overflow-hidden rounded-xl ${imitateLoading ? 'border-none' : 'border'} bg-white`}
                    >
                        {/* Base Image */}
                        {imitateLoading ? (
                            <div className="h-full w-full animate-pulse rounded-lg bg-gray-300"></div>
                        ) : (
                            <img
                                src={product.image}
                                alt={product.slug}
                                className="group-hover:scale-150: h-full w-full cursor-zoom-in object-contain object-center lg:object-contain"
                            />
                        )}

                        {/* Zoom Overlay */}
                    </div>

                    {/* DETAILS SECTION */}
                    <div className="flex flex-col space-y-5">
                        {/* Title */}
                        <h1 className="text-2xl font-semibold text-gray-900 capitalize">
                            {imitateLoading ? (
                                <div className="h-8 animate-pulse rounded-lg bg-gray-300"></div>
                            ) : (
                                `${product.name}`
                            )}
                        </h1>

                        {/* Price */}
                        <div className="text-2xl font-bold text-indigo-600">
                            {imitateLoading ? (
                                <div className="h-8 w-[150px] animate-pulse rounded-lg bg-gray-300"></div>
                            ) : (
                                `$${product.price}`
                            )}
                        </div>

                        {/* Stock */}
                        <div className="mb-4 flex items-center justify-between">
                            <div className="text-sm">
                                {product.stock_quantity > 0 ? (
                                    <span className="font-medium text-green-600">
                                        {imitateLoading ? (
                                            <div className="h-8 w-[150px] animate-pulse rounded-lg bg-gray-300"></div>
                                        ) : (
                                            `In Stock: ${product.stock_quantity}`
                                        )}
                                    </span>
                                ) : (
                                    <span className="font-medium text-red-500">
                                        {imitateLoading ? (
                                            <div className="h-8 w-[150px] animate-pulse rounded-lg bg-gray-300"></div>
                                        ) : (
                                            `Out of stock`
                                        )}
                                    </span>
                                )}
                            </div>

                            {/* <div className="text-2xl font-bold text-indigo-600">
                                {imitateLoading ? (
                                    <div className="h-8 w-[150px] animate-pulse rounded-lg bg-gray-300"></div>
                                ) : (
                                    `Category: ${product.category?.name ?? 'Uncategorized'}`
                                )}
                            </div> */}

                            <div className="text-sm font-semibold text-gray-400">
                                {imitateLoading ? (
                                    <div className="h-8 w-[150px] animate-pulse rounded-lg bg-gray-300"></div>
                                ) : (
                                    <>
                                        <p className="text-black/70">
                                            Date Listed:{' '}
                                            <span className="text-gray-400">
                                                {new Date(
                                                    product.created_at,
                                                ).toLocaleDateString()}
                                            </span>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-400">
                            {imitateLoading ? (
                                <div className="h-8 w-[150px] animate-pulse rounded-lg bg-gray-300"></div>
                            ) : (
                                <>
                                    <p className="text-black/70">
                                        Last Updated:{' '}
                                        <span className="text-gray-400">
                                            {formatTimeAgo(product.updated_at)}
                                        </span>
                                    </p>
                                </>
                            )}
                        </div>
                        {/* Divider */}
                        <div className="m-0 border-t pt-4" />

                        {/* Description */}
                        <p className="m-0 leading-relaxed text-gray-600">
                            {imitateLoading ? (
                                <div className="h-13 animate-pulse rounded-lg bg-gray-300"></div>
                            ) : (

                               <>
                               <div className="flex flex-col gap-3">
                                 <h1 className='text-2xl mb-3 font-semibold text-black'>DESCRIPTION: </h1>
                                `${product.description}`
                               </div>
                               </>
                            )}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 pt-4">
                            <button
                                // disabled={auth.user?.role === 'admin'}
                                onClick={addToWishlist}
                                className={`flex w-full ${auth.user?.role === 'admin' ? 'cursor-not-allowed bg-gray-300 text-black' : 'cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700'} flex-row items-center justify-center gap-3 rounded-lg py-3 font-medium transition`}
                            >
                                <FaHeart />
                                Add To Wishlist
                            </button>
                            {/*   <audio src=""></audio> */}

                            <button
                                disabled={
                                    product.stock_quantity <= 0
                                    // ||
                                    // auth.user?.role === 'admin'
                                }
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsData;
