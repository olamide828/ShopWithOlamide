import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    FaFilter,
    FaSearch,
    FaCheck,
    FaTshirt,
    FaLaptop,
    FaWalking,
    FaGem,
    FaGamepad,
    FaMagic,
    FaCar,
    FaTools,
    FaHome,
    FaBasketballBall,
    FaDumbbell,
    FaBox,
    FaHeadphones,
    FaMicrochip,
    FaCouch,
    FaTv,
    FaBriefcase,
    FaTag,
} from 'react-icons/fa';
import { Toaster } from 'sonner';

const categoryIcons: Record<string, React.ReactNode> = {
    All: <FaBox />,
    Electronics: <FaLaptop />,
    Clothing: <FaTshirt />,
    Audio: <FaHeadphones />,
    Accessories: <FaGem />,
    Gaming: <FaGamepad />,
    Entertainment: <FaTv />,
    Lifestyle: <FaCouch />,
    Fitness: <FaDumbbell />,
    Tech: <FaMicrochip />,
    Automobiles: <FaCar />,
    'Car Autoparts': <FaTools />,
    Beauty: <FaMagic />,
    Shoes: <FaWalking />,
    'Home & Garden': <FaHome />,
    Sports: <FaBasketballBall />,
    Workspace: <FaBriefcase />,
    Toys: <FaGamepad />,
    Uncategorized: <FaBox />,
};

const naira = (amount: number) => `₦${Number(amount).toLocaleString('en-NG')}`;

const filterOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Name (A - Z)', value: 'az' },
    { label: 'Name (Z - A)', value: 'za' },
    { label: 'Price (Low → High)', value: 'price_low' },
    { label: 'Price (High → Low)', value: 'price_high' },
    { label: 'Latest', value: 'latest' },
];

const ProductPageData = () => {
    const {
        products: initialProducts,
        hasMore: initialHasMore,
        categories: serverCategories,
    }: any = usePage().props;

    const [allProducts, setAllProducts] = React.useState(initialProducts);
    const [hasMore, setHasMore] = React.useState(initialHasMore);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [sortOption, setSortOption] = React.useState('default');
    const [showFilter, setShowFilter] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    // Debounce search so we don't fire on every keystroke
    const [debouncedSearch, setDebouncedSearch] = React.useState('');
    React.useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
        return () => clearTimeout(t);
    }, [search]);

    // Build the query string for the API call
    const buildParams = (offset: number) => {
        const p = new URLSearchParams();
        p.set('offset', String(offset));
        if (selectedCategory !== 'All') p.set('category', selectedCategory);
        if (debouncedSearch) p.set('search', debouncedSearch);
        if (sortOption !== 'default') p.set('sort', sortOption);
        return p.toString();
    };

    // Re-fetch from offset=0 whenever filters/sort/search change
    React.useEffect(() => {
        let cancelled = false;

        const refetch = async () => {
            try {
                const res = await fetch(
                    `/shop/u/products/load-more?${buildParams(0)}`,
                );
                const data = await res.json();
                if (!cancelled) {
                    setAllProducts(data.products);
                    setHasMore(data.hasMore);
                }
            } catch {
                /* silent */
            }
        };

        refetch();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, debouncedSearch, sortOption]);

    // Append next page when "Show More" is clicked
    const loadMore = async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
        try {
            const res = await fetch(
                `/shop/u/products/load-more?${buildParams(allProducts.length)}`,
            );
            const data = await res.json();
            setAllProducts((prev: any[]) => [...prev, ...data.products]);
            setHasMore(data.hasMore);
        } catch {
            /* silent */
        } finally {
            setLoadingMore(false);
        }
    };

    const categories = ['All', ...(serverCategories ?? [])];

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster richColors position="top-right" />
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Explore Products
                    </h1>
                    <p className="text-sm text-gray-500">
                        Find the best products at the best prices
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {categories.map((cat: string) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                                selectedCategory === cat
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            <span className="opacity-80">
                                {categoryIcons[cat] || <FaBox />}
                            </span>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="sticky top-18 z-40 mb-6 rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border bg-gray-50 py-2 pr-4 pl-10 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilter(!showFilter)}
                                    className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-100"
                                >
                                    <FaFilter /> Sort
                                </button>
                                {showFilter && (
                                    <div className="absolute left-0 mt-2 w-56 overflow-hidden rounded-xl border bg-white shadow-xl">
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
                                                {sortOption ===
                                                    option.value && (
                                                    <FaCheck className="text-xs text-indigo-600" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {debouncedSearch && (
                                <p className="text-sm text-gray-500">
                                    {allProducts.length}{' '}
                                    {allProducts.length === 1
                                        ? 'item'
                                        : 'items'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
                    {allProducts.length > 0 ? (
                        allProducts.map((product: any) => (
                            <div
                                key={product.id}
                                className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
                            >
                                <div className="relative h-36 w-full overflow-hidden bg-gray-100 sm:h-44">
                                    <img
                                        src={product.image}
                                        alt={product.slug}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition"
                                    />
                                    <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                                        <FaTag className="text-[8px]" />
                                        {product.category || 'General'}
                                    </span>
                                </div>
                                <div className="flex flex-1 flex-col p-3 sm:p-4">
                                    <h2 className="line-clamp-2 min-h-8 text-xs font-medium text-gray-800 sm:min-h-10 sm:text-sm">
                                        {product.name}
                                    </h2>
                                    <p className="mt-2 text-base font-bold text-gray-900 sm:text-lg">
                                        {naira(product.price)}
                                    </p>
                                    <div className="text-xs sm:text-sm">
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
                                    <div className="flex-1" />
                                    <div className="mt-3 flex gap-2 sm:mt-4">
                                        <Link
                                            href={`/shop/u/products/${product.slug}`}
                                            className="flex-1 rounded-md bg-indigo-600 py-2 text-center text-xs font-medium text-white hover:bg-indigo-700 sm:text-sm"
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
                                Try a different search, filter or category
                            </p>
                        </div>
                    )}
                </div>

                {/* Show More / End of Results */}
                <div className="mt-10 flex justify-center">
                    {hasMore ? (
                        <button
                            onClick={loadMore}
                            disabled={loadingMore}
                            className="rounded-lg border border-indigo-600 px-8 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loadingMore ? 'Loading...' : 'Show More'}
                        </button>
                    ) : allProducts.length > 0 ? (
                        <p className="text-sm text-gray-400">
                            — You've reached the end —
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ProductPageData;
