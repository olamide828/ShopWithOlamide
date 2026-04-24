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

// ✅ Category Icons (UNCHANGED - your exact config)
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
    const { products }: any = usePage().props;

    // ✅ Infinite state
    const [items, setItems] = React.useState(products.data);
    const [nextCursor, setNextCursor] = React.useState(products.next_cursor);
    const [loading, setLoading] = React.useState(false);

    // ✅ Filters
    const [search, setSearch] = React.useState('');
    const [sortOption, setSortOption] = React.useState('default');
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [showFilter, setShowFilter] = React.useState(false);

    const observerRef = useRef<HTMLDivElement | null>(null);

    // ✅ Extract categories dynamically
    const categories = [
        'All',
        ...Array.from(new Set(items.map((p: any) => p.category))),
    ];

    // ✅ Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && nextCursor && !loading) {
                    loadMore();
                }
            },
            { threshold: 1 },
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [nextCursor, loading]);

    const loadMore = () => {
        if (!nextCursor) return;

        setLoading(true);

        router.get(
            route('products.page'),
            { cursor: nextCursor },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],
                onSuccess: (page: any) => {
                    setItems((prev: any) => [
                        ...prev,
                        ...page.props.products.data,
                    ]);
                    setNextCursor(page.props.products.next_cursor);
                    setLoading(false);
                },
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

                {/* ✅ Category Tabs WITH ICONS */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {categories.map((cat: any) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                                selectedCategory === cat
                                    ? 'bg-indigo-600 text-white shadow'
                                    : 'border bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <span className="text-sm opacity-80">
                                {categoryIcons[cat] || <FaBox />}
                            </span>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:justify-between">
                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border bg-white py-2 pr-4 pl-10 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-100"
                        >
                            <FaFilter />
                            Sort
                        </button>

                        {showFilter && (
                            <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-xl">
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

                {/* Products */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product: any) => (
                            <div
                                key={product.id}
                                className="group rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden rounded-t-xl">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col p-4">
                                    <h2 className="line-clamp-2 text-sm font-medium text-gray-800">
                                        {product.name}
                                    </h2>

                                    <p className="mt-2 text-lg font-semibold text-gray-900">
                                        ${product.price}
                                    </p>

                                    <p
                                        className={`mt-1 text-xs ${
                                            product.stock_quantity > 0
                                                ? 'text-green-600'
                                                : 'text-red-500'
                                        }`}
                                    >
                                        {product.stock_quantity > 0
                                            ? 'In Stock'
                                            : 'Out of Stock'}
                                    </p>

                                    <div className="mt-auto pt-4">
                                        <Link
                                            href={`/shop/u/products/${product.slug}`}
                                            className="block w-full rounded-md bg-indigo-600 py-2 text-center text-sm font-medium text-white transition hover:bg-indigo-700"
                                        >
                                            View Product
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-lg text-gray-700">
                                No products found
                            </p>
                        </div>
                    )}
                </div>

                {/* Infinite Loader */}
                <div ref={observerRef} className="py-10 text-center">
                    {loading && (
                        <p className="animate-pulse text-sm text-gray-500">
                            Loading more products...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPageData;
