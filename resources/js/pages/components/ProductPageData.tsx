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
    FaBriefcase
} from 'react-icons/fa';
import { Toaster } from 'sonner';

// Icon Mapper - Matches your database category values
const categoryIcons: Record<string, React.ReactNode> = {
    'All': <FaBox />,
    'Electronics': <FaLaptop />,
    'Clothing': <FaTshirt />,
    'Audio': <FaHeadphones />,
    'Accessories': <FaGem />,
    'Gaming': <FaGamepad />,
    'Entertainment': <FaTv />,
    'Lifestyle': <FaCouch />,
    'Fitness': <FaDumbbell />,
    'Tech': <FaMicrochip />,
    'Automobiles': <FaCar />,
    'Car Autoparts': <FaTools />,
    'Beauty': <FaMagic />,
    'Shoes': <FaWalking />,
    'Home & Garden': <FaHome />,
    'Sports': <FaBasketballBall />,
    'Workspace': <FaBriefcase />,
    'Toys': <FaGamepad />,
    'Uncategorized': <FaBox />,
};

const ProductPageData = () => {
    // 1. Get paginated data and current filters from Inertia
    const { products, filters }: any = usePage().props;

    // Local state to store accumulated products
    const [displayProducts, setDisplayProducts] = useState(products.data);
    const [loadingMore, setLoadingMore] = useState(false);
    
    // Filter states
    const [search, setSearch] = useState(filters?.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'All');
    const [showFilter, setShowFilter] = useState(false);
    const [sortOption, setSortOption] = useState('default');

    // Ref for the bottom "trigger" element
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // 2. Extract unique categories (if they aren't coming from the backend separately)
    const categories = [
        'All',
        ...Array.from(new Set(products.data.map((p: any) => p.category))),
    ];

    // 3. Update products when data arrives
    useEffect(() => {
        if (products.current_page === 1) {
            setDisplayProducts(products.data);
        } else {
            setDisplayProducts((prev: any) => [...prev, ...products.data]);
        }
        setLoadingMore(false);
    }, [products.data, products.current_page]);

    // 4. Infinite Scroll Fetch Function
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

    // 5. Intersection Observer Logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [loadNextPage]);

    // 6. Filter/Search Handlers (Reset to page 1)
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
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Explore Products</h1>
                    <p className="text-sm text-gray-500">Find the best products at the best prices</p>
                </div>

                {/* Category Tabs */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {categories.map((cat: any) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                applyFilters(cat);
                            }}
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
                <div className="sticky top-0 z-40 mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:w-80">
                        <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                applyFilters(undefined, e.target.value);
                            }}
                            className="w-full rounded-lg border bg-gray-50 py-2 pr-4 pl-10 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-gray-500">
                            {products.total} items total
                        </p>

                        <div className="relative">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-100"
                            >
                                <FaFilter /> Sort
                            </button>

                            {showFilter && (
                                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border bg-white shadow-xl z-50">
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
                                            {sortOption === option.value && <FaCheck className="text-xs text-indigo-600" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {displayProducts.length > 0 ? (
                        displayProducts.map((product: any) => (
                            <div key={product.id} className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
                                <div className="h-44 w-full overflow-hidden bg-gray-100">
                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-1 flex-col p-4">
                                    <h2 className="line-clamp-2 min-h-10 text-sm font-medium text-gray-800">{product.name}</h2>
                                    <p className="mt-2 text-lg font-bold text-gray-900">${product.price}</p>
                                    <div className="text-sm">
                                        {product.stock_quantity > 0 ? (
                                            <span className="font-medium text-green-600">In Stock</span>
                                        ) : (
                                            <span className="font-medium text-red-500">Out of Stock</span>
                                        )}
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Link href={`/shop/u/products/${product.slug}`} className="flex-1 rounded-md bg-indigo-600 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700">
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

                {/* INFINITE SCROLL SENSOR */}
                <div ref={loadMoreRef} className="mt-12 flex flex-col items-center justify-center pb-10">
                    {loadingMore ? (
                        <>
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                            <p className="mt-2 text-sm text-gray-500 font-medium">Loading next batch...</p>
                        </>
                    ) : products.next_page_url ? (
                        <p className="text-xs text-gray-400">Scroll down to see more</p>
                    ) : displayProducts.length > 0 ? (
                        <p className="text-sm text-gray-400 font-medium">You've reached the end of the catalog.</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ProductPageData;