import React, { useEffect, useState } from 'react';
import {
    FaBox,
    FaEdit,
    FaHourglass,
    FaTimes,
    FaTrash,
    FaTag,
    FaMapMarkerAlt,
    FaPhone,
} from 'react-icons/fa';
import { usePage, Link, router, Head } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';
import Dashboard from './Home/Dashboard';

const CATEGORIES = [
    'Electronics',
    'Clothing',
    'Audio',
    'Accessories',
    'Gaming',
    'Entertainment',
    'Lifestyle',
    'Fitness',
    'Tech',
    'Automobiles',
    'Car Autoparts',
    'Beauty',
    'Shoes',
    'Home & Garden',
    'Sports',
    'Workspace',
    'Toys',
    'Uncategorized',
];

const Products = () => {
    const [dialogueBox, setDialogueBox] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock_quantity: '',
        description: '',
        category: '',
        location: '',
        phone_number: '',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<any>(null);

    const { products }: any = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState('All');

    const showDialogueBox = () => {
        setSelectedProduct(null);
        setDialogueBox(true);
    };

    const handleEditProduct = (product: any) => {
        setSelectedProduct(product);
        setDialogueBox(true);
    };

    const confirmDelete = (product: any) => {
        setProductToDelete(product);
        setDeleteModal(true);
    };

    const handleDeleteProduct = () => {
        if (!productToDelete) return;
        router.delete(`/products/${productToDelete.id}`, {
            onSuccess: () => {
                router.reload({ only: ['products'] });
                toast.success('Product deleted successfully');
            },
        });
        setDeleteModal(false);
        setProductToDelete(null);
    };

    const closeDialogueBox = () => {
        setDialogueBox(false);
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
    };

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                name: selectedProduct.name || '',
                price: selectedProduct.price || '',
                stock_quantity: selectedProduct.stock_quantity || '',
                description: selectedProduct.description || '',
                category: selectedProduct.category || '',
                location: selectedProduct.location || '',
                // FIX: was `phone_mumber` (typo) — phone never pre-filled on edit
                phone_number: selectedProduct.phone_number || '',
            });
            setImagePreview(selectedProduct.image || null);
        } else {
            setFormData({
                name: '',
                price: '',
                stock_quantity: '',
                description: '',
                category: '',
                location: '',
                phone_number: '',
            });
            setImagePreview(null);
            setImageFile(null);
        }
    }, [selectedProduct]);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name.toUpperCase());
        data.append('price', formData.price);
        data.append('stock_quantity', formData.stock_quantity);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('location', formData.location);
        data.append('phone_number', formData.phone_number);

        if (imageFile) data.append('image', imageFile);

        if (selectedProduct) {
            data.append('_method', 'PUT');
            router.post(`/shop/u/products/${selectedProduct.id}`, data, {
                onSuccess: () => {
                    router.reload({ only: ['products', 'stats'] });
                    toast.success('Product updated successfully');
                },
                onError: (errors) => {
                    Object.values(errors).forEach((error: any) =>
                        toast.error(error),
                    );
                },
            });
        } else {
            router.post('/shop/u/products/', data, {
                onSuccess: () => {
                    router.reload({ only: ['products', 'stats'] });
                    toast.success('Product listed successfully');
                    setTimeout(() => window.location.reload(), 100);
                },
                onError: (errors) => {
                    Object.values(errors).forEach((error: any) =>
                        toast.error(error),
                    );
                },
            });
        }

        closeDialogueBox();
    };

    const categories = [
        'All',
        ...Array.from(
            new Set(
                products.data.map((p: any) => p.category || 'Uncategorized'),
            ),
        ),
    ];

    const filteredProducts =
        selectedCategory === 'All'
            ? products.data
            : products.data.filter((p: any) => p.category === selectedCategory);

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
        <div className="space-y-6">
            <Head title="Admin Inventory Control - ShopWithOlamide" />
            <Toaster richColors position="top-right" />

            {/* Header */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Product Management
                    </h1>
                    <p className="text-gray-500">
                        Manage your store products efficiently
                    </p>
                </div>
                <button
                    onClick={showDialogueBox}
                    className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-white shadow transition hover:bg-indigo-700"
                >
                    <FaBox /> New Listing
                </button>
            </div>

            {products.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <FaBox className="mb-4 text-5xl text-gray-200" />
                    <p className="text-lg font-semibold text-gray-400">
                        No products yet
                    </p>
                    <p className="text-sm text-gray-400">
                        Click "New Listing" to add your first product.
                    </p>
                </div>
            ) : (
                <>
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                                    selectedCategory === cat
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product: any) => (
                            <div
                                key={product.id}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                            >
                                {/* Image */}
                                <div className="relative h-44 w-full overflow-hidden bg-gray-50">
                                    <img
                                        src={product.image}
                                        alt={product.slug}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                    {/* Category badge */}
                                    <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                                        <FaTag className="text-[8px]" />
                                        {product.category || 'General'}
                                    </span>
                                    {/* Edit button */}
                                    <button
                                        onClick={() =>
                                            handleEditProduct(product)
                                        }
                                        className="absolute top-2 right-2 rounded-full bg-white p-2 shadow-md transition hover:bg-indigo-50 hover:text-indigo-600"
                                    >
                                        <FaEdit size={12} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-4">
                                    {/* Name — truncated to 1 line */}
                                    <h2 className="truncate text-sm font-semibold text-gray-800 capitalize">
                                        {product.name}
                                    </h2>

                                    {/* Description — truncated to 2 lines */}
                                    {product.description && (
                                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-400">
                                            {product.description}
                                        </p>
                                    )}

                                    <p className="mt-2 text-lg font-bold text-indigo-600">
                                        ${product.price}
                                    </p>

                                    {/* Meta row */}
                                    <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
                                        <span>
                                            Stock:{' '}
                                            <span
                                                className={`font-semibold ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-500'}`}
                                            >
                                                {product.stock_quantity}
                                            </span>
                                        </span>
                                        <span>
                                            {formatTimeAgo(product.created_at)}
                                        </span>
                                    </div>

                                    {/* Location */}
                                    {product.location && (
                                        <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
                                            <FaMapMarkerAlt className="shrink-0 text-indigo-400" />
                                            <span className="truncate capitalize">
                                                {product.location}
                                            </span>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-4 flex gap-2">
                                        <Link
                                            href={`/admin/products/${product.slug}`}
                                            className="flex-1 rounded-lg bg-gray-900 py-2 text-center text-xs font-semibold text-white transition hover:bg-black"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() =>
                                                confirmDelete(product)
                                            }
                                            className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-500 transition hover:bg-red-100"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2">
                        {products.links.map((link: any, index: number) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`rounded-lg border px-4 py-2 text-sm transition ${
                                    link.active
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                } ${!link.url && 'cursor-not-allowed opacity-50'}`}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* ── CREATE / EDIT MODAL ── */}
            {dialogueBox && (
                <div
                    onClick={closeDialogueBox}
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex max-h-[92dvh] w-full flex-col rounded-t-3xl bg-white sm:max-w-lg sm:rounded-2xl"
                    >
                        {/* Modal header — sticky */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <h2 className="text-lg font-bold text-gray-900">
                                {selectedProduct
                                    ? 'Edit Product'
                                    : 'New Listing'}
                            </h2>
                            <button
                                onClick={closeDialogueBox}
                                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            >
                                <FaTimes size={14} />
                            </button>
                        </div>

                        {/* Scrollable form body */}
                        <div className="overflow-y-auto px-6 py-4">
                            <form onSubmit={handleSubmit} className="space-y-3">
                                {/* Image Upload */}
                                <div>
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition hover:border-indigo-400">
                                        {imagePreview ? (
                                            <>
                                                <img
                                                    src={imagePreview}
                                                    alt="preview"
                                                    className="h-full w-full object-contain"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black"
                                                >
                                                    <FaTimes size={10} />
                                                </button>
                                            </>
                                        ) : (
                                            <label
                                                htmlFor="image"
                                                className="flex cursor-pointer flex-col items-center gap-2 text-sm text-gray-400"
                                            >
                                                <FaHourglass className="text-xl text-indigo-300" />
                                                <span>
                                                    Click to upload image
                                                </span>
                                            </label>
                                        )}
                                    </div>
                                    {imagePreview && (
                                        <label
                                            htmlFor="image"
                                            className="mt-1 block cursor-pointer text-center text-xs text-indigo-500 hover:underline"
                                        >
                                            Change image
                                        </label>
                                    )}
                                </div>

                                {/* 2-col row: Name + Price */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2">
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Product name"
                                            required
                                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm capitalize outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        />
                                    </div>
                                    <input
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        type="number"
                                        placeholder="Price ($)"
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    />
                                    <input
                                        name="stock_quantity"
                                        value={formData.stock_quantity}
                                        onChange={handleChange}
                                        type="number"
                                        placeholder="Stock qty"
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>

                                {/* Category */}
                                <select
                                    name="category"
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                >
                                    <option value="">Select category</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>

                                {/* 2-col row: Location + Phone */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-xs text-gray-400" />
                                        <input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Location"
                                            className="w-full rounded-lg border border-gray-200 py-2.5 pr-3 pl-8 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        />
                                    </div>
                                    <div className="relative">
                                        <FaPhone className="absolute top-1/2 left-3 -translate-y-1/2 text-xs text-gray-400" />
                                        <input
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            type="tel"
                                            placeholder="Phone"
                                            className="w-full rounded-lg border border-gray-200 py-2.5 pr-3 pl-8 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Product description"
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                                {/* Submit — sticky at bottom of form */}
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
                                >
                                    {selectedProduct
                                        ? 'Save Changes'
                                        : 'Create Listing'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ── DELETE CONFIRMATION MODAL ── */}
            {deleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                            <FaTrash className="text-red-500" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Delete product?
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            <span className="font-semibold text-gray-700">
                                {productToDelete?.name}
                            </span>{' '}
                            will be permanently removed. This cannot be undone.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => {
                                    setDeleteModal(false);
                                    setProductToDelete(null);
                                }}
                                className="flex-1 cursor-pointer rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteProduct}
                                className="flex-1 cursor-pointer rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Yes, delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Products.layout = (page: any) => <Dashboard>{page}</Dashboard>;
export default Products;
