import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaFilter, FaSearch, FaCheck } from 'react-icons/fa';

const ProductPageData = () => {
    const { products }: any = usePage().props;

    const [search, setSearch] = React.useState('');
    const [sortOption, setSortOption] = React.useState('default');
    const [showFilter, setShowFilter] = React.useState(false);
    const trimmedSearch = search.trimStart().trimEnd();

    // Search
    let filteredProducts = products.filter((product: any) =>
        product.name.toLowerCase().includes(trimmedSearch.toLowerCase()),
    );

    // Sort
    const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
        switch (sortOption) {
            case 'az':
                return a.name.localeCompare(b.name);
            case 'za':
                return b.name.localeCompare(a.name);
            case 'price_low':
                return a.price - b.price;
            case 'price_high':
                return b.price - a.price;
            case 'latest':
                return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                );
            default:
                return 0;
        }
    });

    const filterOptions = [
        { label: 'Default', value: 'default' },
        { label: 'Name (A - Z)', value: 'az' },
        { label: 'Name (Z - A)', value: 'za' },
        { label: 'Price (Low → High)', value: 'price_low' },
        { label: 'Price (High → Low)', value: 'price_high' },
        { label: 'Latest', value: 'latest' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Toast */}

            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Explore Products
                    </h1>
                    <p className="text-sm text-gray-500">
                        Find the best products at the best prices
                    </p>
                </div>

                {/* Toolbar */}
                <div className="sticky top-0 z-40 mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
                    {/* Left - Search */}
                    <div className="relative w-full md:w-80">
                        <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={trimmedSearch}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border bg-gray-50 py-2 pr-4 pl-10 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    {/* Right - Controls */}
                    <div className="flex items-center justify-between gap-3">
                        {/* Count */}
                        <p className="hidden text-sm text-gray-500 md:block">
                            {sortedProducts.length} items
                        </p>

                        {/* Filter */}
                        <div className="relative">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-100"
                            >
                                <FaFilter />
                                Sort
                            </button>

                            {showFilter && (
                                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border bg-white shadow-xl">
                                    {filterOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setSortOption(option.value);
                                                setShowFilter(false);
                                            }}
                                            className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            {option.label}
                                            {sortOption === option.value && (
                                                <FaCheck className="text-xs text-indigo-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product: any) => (
                            <div
                                key={product.id}
                                className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
                            >
                                {/* Image */}
                                <div className="h-44 w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.slug}
                                        className="h-full w-full object-cover transition"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-4">
                                    {/* Title */}
                                    <h2 className="line-clamp-2 min-h-10 text-sm font-medium text-gray-800">
                                        {product.name}
                                    </h2>

                                    {/* Price */}
                                    <p className="mt-2 text-lg font-bold text-gray-900">
                                        ${product.price}
                                    </p>

                                    {/* Stock */}
                                    <div className="text-sm">
                                        {product.stock_quantity > 0 ? (
                                            <span className="font-medium text-green-600">
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className="font-medium text-red-500">
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>

                                    {/* Spacer */}
                                    <div className="flex-1" />

                                    {/* Actions */}
                                    <div className="mt-4 flex gap-2">
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="flex-1 rounded-md bg-indigo-600 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <p className="text-lg font-medium text-gray-700">
                                No products found
                            </p>
                            <p className="text-sm text-gray-500">
                                Try a different search or filter
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPageData;
