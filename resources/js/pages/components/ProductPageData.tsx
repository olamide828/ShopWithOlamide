import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { 
    FaFilter, FaSearch, FaCheck, FaTshirt, FaLaptop, FaWalking, FaGem, 
    FaGamepad, FaMagic, FaCar, FaTools, FaHome, FaBasketballBall, 
    FaDumbbell, FaBox, FaHeadphones, FaMicrochip, FaCouch, FaTv, FaBriefcase 
} from 'react-icons/fa';
import { Toaster } from 'sonner';

const categoryIcons: Record<string, React.ReactNode> = {
    'All': <FaBox />, 'Electronics': <FaLaptop />, 'Clothing': <FaTshirt />,
    'Audio': <FaHeadphones />, 'Accessories': <FaGem />, 'Gaming': <FaGamepad />,
    'Entertainment': <FaTv />, 'Lifestyle': <FaCouch />, 'Fitness': <FaDumbbell />,
    'Tech': <FaMicrochip />, 'Automobiles': <FaCar />, 'Car Autoparts': <FaTools />,
    'Beauty': <FaMagic />, 'Shoes': <FaWalking />, 'Home & Garden': <FaHome />,
    'Sports': <FaBasketballBall />, 'Workspace': <FaBriefcase />, 'Toys': <FaGamepad />,
    'Uncategorized': <FaBox />,
};

const ProductPageData = () => {
    // GUARD 1: Grab props safely
    const { products, filters }: any = usePage().props;

    // GUARD 2: If products is missing, don't run state logic yet
    if (!products || !products.data) return null;

    const [displayProducts, setDisplayProducts] = useState(products.data);
    const [loadingMore, setLoadingMore] = useState(false);
    const [search, setSearch] = useState(filters?.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'All');
    const [showFilter, setShowFilter] = useState(false);
    
    // REVERTED: Back to your original simple state initialization
    const [sortOption, setSortOption] = useState('default');

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const categories = [
        'All',
        ...Array.from(new Set(products.data.map((p: any) => p.category))),
    ];

    useEffect(() => {
        if (products.current_page === 1) {
            setDisplayProducts(products.data);
        } else {
            setDisplayProducts((prev: any) => [...prev, ...products.data]);
        }
        setLoadingMore(false);
    }, [products.data, products.current_page]);

    // REVERTED: Your original filter application logic
    const applyFilters = (newCategory?: string, newSearch?: string) => {
        const category = newCategory !== undefined ? newCategory : selectedCategory;
        const searchQuery = newSearch !== undefined ? newSearch : search;

        router.get(window.location.pathname, 
            { 
                category: category === 'All' ? '' : category, 
                search: searchQuery 
            }, 
            { preserveState: true, replace: true }
        );
    };

    // FAST SEARCH: No long loading bars, just instant filter
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters?.search || '')) {
                applyFilters(undefined, search);
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const loadNextPage = useCallback(() => {
        if (products.next_page_url && !loadingMore) {
            setLoadingMore(true);
            router.get(products.next_page_url, {}, {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],
                onFinish: () => setLoadingMore(false),
            });
        }
    }, [products.next_page_url, loadingMore]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) loadNextPage();
            }, { threshold: 0.1 }
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
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Explore Products</h1>
                    <p className="mt-2 text-slate-500 font-medium">Find the best products at the best prices</p>
                </div>

                {/* Categories */}
                <div className="mb-8 flex flex-wrap gap-3">
                    {categories.map((cat: any) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                applyFilters(cat);
                            }}
                            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                selectedCategory === cat
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105'
                                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                        >
                            <span className={selectedCategory === cat ? 'text-white' : 'text-indigo-500'}>
                                {categoryIcons[cat] || <FaBox />}
                            </span>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="sticky top-4 z-40 mb-10 flex flex-col gap-4 rounded-2xl bg-white/90 backdrop-blur-md p-4 border border-slate-200 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border-slate-200 bg-slate-50 py-2.5 pr-4 pl-12 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6">
                        <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">
                            {products.total === 1 ? "1 Result" : `${products.total} Results`}
                        </span>

                        <div className="relative">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-indigo-500"
                            >
                                <FaFilter className="text-indigo-500 text-xs" /> Sort
                            </button>

                            {showFilter && (
                                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl z-50">
                                    {filterOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setSortOption(option.value);
                                                setShowFilter(false);
                                            }}
                                            className="flex w-full items-center justify-between px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                                        >
                                            {option.label}
                                            {sortOption === option.value && <FaCheck className="text-indigo-600 text-xs" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {displayProducts.length > 0 ? (
                        displayProducts.map((product: any) => (
                            <div key={product.id} className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-50">
                                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute top-3 left-3">
                                        <span className="rounded-lg bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-black uppercase text-slate-800 shadow-sm border border-slate-100">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col p-5">
                                    <h2 className="line-clamp-2 min-h-[40px] text-[15px] font-bold text-slate-800 group-hover:text-indigo-600 transition leading-snug">
                                        {product.name}
                                    </h2>
                                    <div className="mt-5 flex items-end justify-between">
                                        <div>
                                            <p className="text-2xl font-black text-slate-900 leading-none">${product.price}</p>
                                            <p className={`text-[10px] font-bold uppercase mt-2 ${product.stock_quantity > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {product.stock_quantity > 0 ? '● In Stock' : '○ Out of Stock'}
                                            </p>
                                        </div>
                                        <Link 
                                            href={`/shop/u/products/${product.slug}`} 
                                            className="rounded-xl bg-slate-900 px-5 py-2.5 text-[11px] font-black uppercase tracking-wider text-white transition hover:bg-indigo-600 active:scale-95"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <p className="text-lg font-medium text-gray-700">No products found</p>
                        </div>
                    )}
                </div>

                {/* Infinite Scroll Sensor */}
                <div ref={loadMoreRef} className="mt-20 flex flex-col items-center justify-center pb-20">
                    {loadingMore ? (
                        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-indigo-600 border-t-transparent"></div>
                    ) : products.next_page_url ? (
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Scroll for more</p>
                    ) : displayProducts.length > 0 ? (
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">End of results</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ProductPageData;