import { Link, router, usePage } from '@inertiajs/react';
// import UserDashboard from './UserDashboard';

export default function WishlistComponent() {
    const { wishlist = [] }: any = usePage().props; 

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Wishlist
                        </h1>
                        <p className="mt-1 text-gray-500">
                            Save products you may want later.
                        </p>
                    </div>

                    <Link
                        href="/dashboard"
                        className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                        Back to Dashboard
                    </Link>
                </div>

                {wishlist.length === 0 ? (
                    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                        <p className="text-lg text-gray-400">
                            Your wishlist is empty.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {wishlist.map((item: any) => (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                            >
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="mb-4 h-52 w-full rounded-xl object-cover"
                                />

                                <h2 className="mb-2 text-lg font-bold text-gray-900 line-clamp-1">
                                    {item.product.name}
                                </h2>

                                <p className="mb-4 text-xl font-bold text-indigo-600">
                                    ${item.product.price}
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            router.post('/cart', {
                                                product_id: item.product.id,
                                            })
                                        }
                                        className="flex-1 cursor-pointer rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
                                    >
                                        Add to Cart
                                    </button>

                                    <button
                                        onClick={() =>
                                            router.delete(`/wishlist/${item.id}`)
                                        }
                                        className="rounded-xl cursor-pointer border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


// WishlistPage.layout = (page: any) => <UserDashboard children={page} />;
