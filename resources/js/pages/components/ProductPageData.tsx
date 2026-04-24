import React, { useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
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
} from 'react-icons/fa';
import { Toaster } from 'sonner';

// ✅ Category Icons
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

const ProductPageData = () => {
    const { products, categories: backendCategories }: any = usePage().props;

    // ✅ STATE
    const [items, setItems] = React.useState(products.data || []);
    const [nextCursor, setNextCursor] = React.useState(products.next_cursor);
    const [loading, setLoading] = React.useState(false);

    const [search, setSearch] = React.useState('');
    const [sortOption, setSortOption] = React.useState('default');
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [showFilter, setShowFilter] = React.useState(false);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const categories = ['All', ...(backendCategories || [])];

    // ✅ 🔥 CRITICAL FIX: Sync state with backend (refresh / navigation)
    useEffect(() => {
        setItems(products.data || []);
    }, [products.data]);

    // ✅ Infinite scroll (ONLY for "All")
    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (
                entries[0].isIntersecting &&
                products.next_page_url &&
                !loading
            ) {
                loadMore();
            }
        });

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [products.next_page_url, loading]);

    const loadMore = () => {
        if (!products.next_page_url || loading) return;

        setLoading(true);

        router.get(
            products.next_page_url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],

                onSuccess: (page: any) => {
                    setItems((prev: any) => [
                        ...prev,
                        ...page.props.products.data,
                    ]);

                    setLoading(false);
                },

                onError: () => setLoading(false),
                onFinish: () => setLoading(false),
            },
        );
    };

    const trimmedSearch = search.trim();

    // ✅ Filter
    let filteredProducts = items.filter((product: any) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(trimmedSearch.toLowerCase());

        const matchesCategory =
            selectedCategory === 'All' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // ✅ Sort
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
            <Toaster richColors position="top-right" />

            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Explore Products
                    </h1>
                    <p className="text-sm text-gray-500">
                        Find quality products at great prices
                    </p>
                </div>

                {/* Categories */}
                <div className="sticky top-20 z-30 mb-6 bg-gray-100/95 backdrop-blur">
                    {/* CATEGORY ROW */}
                    <div className="flex gap-2 px-4 py-3">
                        {categories.map((cat: any) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
                                    selectedCategory === cat
                                        ? 'bg-indigo-600 text-white shadow'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {categoryIcons[cat] || <FaBox />}
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* TOOLBAR ROW */}
                    <div className="flex flex-col gap-3 px-4 pb-3 md:flex-row md:items-center md:justify-between">
                        {/* SEARCH */}
                        <div className="relative w-full md:w-80">
                            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border bg-white py-2 pr-4 pl-10 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                            <p>{products.data.length} products found</p>
                        </div>

                        {/* SORT */}
                        <div className="relative">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-100"
                            >
                                <FaFilter /> Sort
                            </button>

                            {showFilter && (
                                <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border bg-white shadow-xl">
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
                                                <FaCheck className="text-indigo-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 🔥 STATES HANDLED PROPERLY */}

                {/* Initial Loading */}
                {loading && items.length === 0 && (
                    <div className="py-20 text-center text-gray-500">
                        Loading products...
                    </div>
                )}

                {/* No Results */}
                {!loading && sortedProducts.length === 0 && (
                    <div className="py-20 text-center text-gray-500">
                        No products found
                    </div>
                )}

                {/* Products */}
                {sortedProducts.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {sortedProducts.map((product: any) => (
                            <div
                                key={product.id}
                                className="group rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
                            >
                                <div className="relative h-48 overflow-hidden rounded-t-xl">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition group-hover:scale-105"
                                    />
                                    <span className="absolute top-2 left-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                                        {product.category || 'General'}
                                    </span>
                                </div>

                                <div className="flex flex-col p-4">
                                    <h2 className="line-clamp-2 text-sm font-medium">
                                        {product.name}
                                    </h2>

                                    <p className="mt-2 font-semibold">
                                        ${product.price}
                                    </p>

                                    <p className={`mt-1 text-xs ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'} `}>
                                        {product.stock_quantity > 0
                                            ? 'In Stock'
                                            : 'Out of Stock'}
                                    </p>

                                    <Link
                                        href={`/shop/u/products/${product.slug}`}
                                        className="mt-4 block rounded-md bg-indigo-600 py-2 text-center text-sm text-white"
                                    >
                                        View Product
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Infinite Loader */}
                {selectedCategory === 'All' && (
                    <div ref={observerRef} className="py-10 text-center">
                        {loading && items.length > 0 && (
                            <p className="animate-pulse text-sm text-gray-500">
                                Loading more products...
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPageData;
