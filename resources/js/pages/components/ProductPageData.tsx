import React, { useEffect, useState, useRef, useCallback } from 'react';
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
    const { products, filters }: any = usePage().props;

    // Safety check: ensure products exists before rendering to prevent crash
    if (!products) return null;

    const [displayProducts, setDisplayProducts] = useState(products.data || []);
    const [loadingMore, setLoadingMore] = useState(false);
    const [search, setSearch] = useState(filters?.search || '');
    const [selectedCategory, setSelectedCategory] = useState(
        filters?.category || 'All',
    );
    const [showFilter, setShowFilter] = useState(false);

    // FIX: Hard fallback to 'default' string to prevent TypeError
    const [sortOption, setSortOption] = useState(filters?.sort || 'default');

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // Extract categories safely
    const categories = [
        'All',
        ...Array.from(
            new Set((products.data || []).map((p: any) => p.category)),
        ),
    ];

    useEffect(() => {
        if (products.current_page === 1) {
            setDisplayProducts(products.data);
        } else {
            setDisplayProducts((prev: any) => [...prev, ...products.data]);
        }
        setLoadingMore(false);
    }, [products.data]);

    // Fixed ApplyFilters with safety defaults
    const applyFilters = useCallback(
        (overrides: any = {}) => {
            const categoryVal =
                overrides.category !== undefined
                    ? overrides.category
                    : selectedCategory === 'All'
                      ? ''
                      : selectedCategory;
            const searchVal =
                overrides.search !== undefined ? overrides.search : search;
            const sortVal =
                overrides.sort !== undefined ? overrides.sort : sortOption;

            router.get(
                window.location.pathname,
                { category: categoryVal, search: searchVal, sort: sortVal },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                    onBefore: () =>
                        !overrides.isInfinite && setLoadingMore(true),
                    onFinish: () => setLoadingMore(false),
                },
            );
        },
        [search, selectedCategory, sortOption],
    );

    // Debounced search logic (Instant feel)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters?.search || '')) {
                applyFilters({ search });
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search, applyFilters, filters?.search]);

    const loadNextPage = useCallback(() => {
        if (products.next_page_url && !loadingMore) {
            setLoadingMore(true);
            router.get(
                products.next_page_url,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['products'],
                    onFinish: () => setLoadingMore(false),
                },
            );
        }
    }, [products.next_page_url, loadingMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadNextPage();
            },
            { threshold: 0.1 },
        );
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [loadNextPage]);

    const filterOptions = [
        { label: 'Default', value: 'default' },
        { label: 'Name (A - Z)', value: 'az' },
        { label: 'Name (Z - A)', value: 'za' },
        { label: 'Price (Low → High)', value: 'price_low' },
        { label: 'Price (High → Low)', value: 'price_high' },
        { label: 'Latest', value: 'latest' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Toaster richColors position="top-right" />

            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                        Explore Products
                    </h1>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                        Find the best products at the best prices
                    </p>
                </div>

                {/* Categories */}
                <div className="mb-8 flex flex-wrap gap-3">
                    {categories.map((cat: any) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                applyFilters({
                                    category: cat === 'All' ? '' : cat,
                                });
                            }}
                            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                selectedCategory === cat
                                    ? 'scale-105 bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {categoryIcons[cat] || <FaBox />}
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="sticky top-4 z-40 mb-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur-md md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-sm text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border-slate-200 bg-slate-50 py-2.5 pr-4 pl-12 text-sm transition-all outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-6 md:justify-end">
                        {/* Your Updated Result Logic */}
                        <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">
                            {products.total === 1
                                ? '1 Result'
                                : `${products.total} Results`}
                        </span>

                        <div className="relative">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-500"
                            >
                                <FaFilter className="text-xs text-indigo-500" />{' '}
                                Sort
                            </button>

                            {showFilter && (
                                <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
                                    {filterOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setSortOption(option.value);
                                                applyFilters({
                                                    sort: option.value,
                                                });
                                                setShowFilter(false);
                                            }}
                                            className="flex w-full items-center justify-between px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
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
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {displayProducts.map((product: any) => (
                        <div
                            key={product.id}
                            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-50"
                        >
                            <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="rounded-lg border border-slate-100 bg-white/90 px-2.5 py-1 text-[10px] font-black text-slate-800 uppercase shadow-sm backdrop-blur">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                                <h2 className="line-clamp-2 min-h-[40px] text-[15px] leading-snug font-bold text-slate-800 transition group-hover:text-indigo-600">
                                    {product.name}
                                </h2>
                                <div className="mt-5 flex items-end justify-between">
                                    <div>
                                        <p className="text-2xl leading-none font-black text-slate-900">
                                            ${product.price}
                                        </p>
                                        <p
                                            className={`mt-2 text-[10px] font-bold uppercase ${product.stock_quantity > 0 ? 'text-emerald-500' : 'text-rose-500'}`}
                                        >
                                            {product.stock_quantity > 0
                                                ? '● In Stock'
                                                : '○ Out of Stock'}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/shop/u/products/${product.slug}`}
                                        className="rounded-xl bg-slate-900 px-5 py-2.5 text-[11px] font-black tracking-wider text-white uppercase transition hover:bg-indigo-600 active:scale-95"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading State */}
                <div
                    ref={loadMoreRef}
                    className="mt-20 flex flex-col items-center justify-center pb-20"
                >
                    {loadingMore ? (
                        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-indigo-600 border-t-transparent"></div>
                    ) : !products.next_page_url &&
                      displayProducts.length > 0 ? (
                        <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                            End of results
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ProductPageData;
