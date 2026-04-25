import React, { useState } from 'react';
import { usePage, router, Head } from '@inertiajs/react';
import {
    FaEdit,
    FaTrash,
    FaTimes,
    FaArrowLeft,
    FaMapMarkerAlt,
    FaPhone,
    FaTag,
    FaBox,
    FaClock,
} from 'react-icons/fa';
import { toast, Toaster } from 'sonner';

const ViewProduct = () => {
    const { product }: any = usePage().props;

    const [editing, setEditing] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [formData, setFormData] = useState({
        name: product.name || '',
        price: product.price || '',
        stock_quantity: product.stock_quantity || '',
        description: product.description || '',
        category: product.category || '',
        location: product.location || '',
        phone_number: product.phone_number || '',
    });

    const [imagePreview, setImagePreview] = useState(product.image);
    const [imageFile, setImageFile] = useState<any>(null);

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

    const handleUpdate = (e: any) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('stock_quantity', formData.stock_quantity);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('location', formData.location);
        data.append('phone_number', formData.phone_number);
        data.append('_method', 'PUT');

        if (imageFile) data.append('image', imageFile);

        router.post(`/admin/products/${product.id}`, data, {
            onSuccess: () => {
                setEditing(false);
                toast.success('Product updated successfully');
                window.location.reload();
            },
            onError: (errors) => {
                Object.values(errors).forEach((e: any) => toast.error(e));
            },
        });
    };

    const handleDelete = () => {
        router.delete(`/admin/products/${product.id}`, {
            onSuccess: () => {
                router.visit('/admin/products');
                toast.success('Product deleted successfully');
            },
        });
    };

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster richColors position="top-right" />
            <Head title={`${product.name} — Admin`} />

            {/* Top bar */}
            <div className="border-b border-gray-100 bg-white px-6 py-4">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <button
                        onClick={() => router.get('/admin/products')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
                    >
                        <FaArrowLeft className="text-xs" /> Back to Products
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setEditing(!editing)}
                            className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                editing
                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                        >
                            {editing ? (
                                <FaTimes size={12} />
                            ) : (
                                <FaEdit size={12} />
                            )}
                            {editing ? 'Cancel' : 'Edit Product'}
                        </button>

                        <button
                            onClick={() => setDeleteModal(true)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                        >
                            <FaTrash size={12} /> Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* ── IMAGE PANEL ── */}
                    <div className="group relative h-[420px] overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 shadow-sm">
                        {/* Blurred ambient background */}
                        <img
                            src={imagePreview}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-75"
                        />
                        {/* Full product image */}
                        <img
                            src={imagePreview}
                            alt={product.slug}
                            className="relative h-full w-full cursor-zoom-in object-contain transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Category badge */}
                        {product.category && (
                            <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                <FaTag className="text-[9px]" />
                                {product.category}
                            </span>
                        )}

                        {/* Image upload overlay when editing */}
                        {editing && (
                            <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 bg-black/40 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black/50">
                                <FaEdit className="text-2xl" />
                                Click to change image
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    {/* ── DETAILS / EDIT PANEL ── */}
                    <div className="flex flex-col">
                        {editing ? (
                            /* ── EDIT FORM ── */
                            <form
                                onSubmit={handleUpdate}
                                className="space-y-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                            >
                                <h2 className="mb-4 text-lg font-bold text-gray-900">
                                    Edit Product
                                </h2>

                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product name"
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Price ($)"
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    />
                                    <input
                                        name="stock_quantity"
                                        type="number"
                                        value={formData.stock_quantity}
                                        onChange={handleChange}
                                        placeholder="Stock qty"
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                >
                                    <option value="">Select category</option>
                                    {[
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
                                    ].map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-xs text-gray-400" />
                                        <input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
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
                                            placeholder="Phone"
                                            type="tel"
                                            className="w-full rounded-lg border border-gray-200 py-2.5 pr-3 pl-8 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        />
                                    </div>
                                </div>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Product description"
                                    rows={4}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
                                >
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            /* ── VIEW MODE ── */
                            <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                {/* Name */}
                                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                                    {product.name}
                                </h1>

                                {/* Price + Stock */}
                                <div className="flex items-center justify-between">
                                    <p className="text-3xl font-black text-indigo-600">
                                        ${product.price}
                                    </p>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                                            product.stock_quantity > 0
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-600'
                                        }`}
                                    >
                                        {product.stock_quantity > 0
                                            ? `${product.stock_quantity} in stock`
                                            : 'Out of stock'}
                                    </span>
                                </div>

                                {/* Meta pills */}
                                <div className="flex flex-wrap gap-2">
                                    {product.category && (
                                        <span className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                                            <FaTag className="text-[9px]" />{' '}
                                            {product.category}
                                        </span>
                                    )}
                                    {product.location && (
                                        <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                            <FaMapMarkerAlt className="text-[9px] text-indigo-400" />{' '}
                                            {product.location}
                                        </span>
                                    )}
                                    {product.phone_number && (
                                        <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                            <FaPhone className="text-[9px]" />{' '}
                                            {product.phone_number}
                                        </span>
                                    )}
                                </div>

                                <div className="border-t border-gray-100" />

                                {/* Description */}
                                <div>
                                    <p className="mb-2 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                                        About this product
                                    </p>
                                    {product.description ? (
                                        <div className="flex flex-col gap-2">
                                            {product.description
                                                .split('\n')
                                                .filter((l: string) => l.trim())
                                                .map(
                                                    (
                                                        para: string,
                                                        i: number,
                                                    ) => (
                                                        <p
                                                            key={i}
                                                            className="text-sm leading-relaxed text-gray-600"
                                                        >
                                                            {para}
                                                        </p>
                                                    ),
                                                )}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">
                                            No description provided.
                                        </p>
                                    )}
                                </div>

                                <div className="border-t border-gray-100" />

                                {/* Timestamps */}
                                <div className="flex flex-col gap-1 text-xs text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <FaClock className="text-[9px]" />
                                        Listed: {formatDate(product.created_at)}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <FaClock className="text-[9px]" />
                                        Updated:{' '}
                                        {formatDate(product.updated_at)}
                                    </span>
                                </div>

                                <div className="mt-auto pt-2">
                                    <button
                                        onClick={() =>
                                            router.get('/admin/products')
                                        }
                                        className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-black"
                                    >
                                        ← Back to Inventory
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── DELETE MODAL ── */}
            {deleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                            <FaTrash className="text-red-500" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Delete product?
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            <span className="font-semibold text-gray-800">
                                {product.name}
                            </span>{' '}
                            will be permanently removed and cannot be recovered.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="flex-1 cursor-pointer rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
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

export default ViewProduct;
