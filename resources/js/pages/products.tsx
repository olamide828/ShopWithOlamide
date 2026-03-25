import React, { useEffect, useState } from 'react';
import Dashboard from './Home/Dashboard';
import { FaBox, FaEdit, FaHourglass, FaTimes } from 'react-icons/fa';
import { usePage, Link, router } from '@inertiajs/react';

const Products = () => {
    const [dialogueBox, setDialogueBox] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    // ✅ NEW: delete modal state
    const [deleteModal, setDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock_quantity: '',
        description: '',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<any>(null);

    const { products } = usePage().props;

    const showDialogueBox = () => {
        setSelectedProduct(null);
        setDialogueBox(true);
    };

    const handleEditProduct = (product: any) => {
        setSelectedProduct(product);
        setDialogueBox(true);
    };

    // ✅ Open custom delete modal
    const confirmDelete = (product: any) => {
        setProductToDelete(product);
        setDeleteModal(true);
    };

    // ✅ Execute delete
    const handleDeleteProduct = () => {
        if (!productToDelete) return;

        router.delete(`/products/${productToDelete.id}`, {
            onSuccess: () => {
                router.reload({ only: ['products'] });
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
            });

            setImagePreview(selectedProduct.image || null);
        } else {
            setFormData({
                name: '',
                price: '',
                stock_quantity: '',
                description: '',
            });
            setImagePreview(null);
        }
    }, [selectedProduct]);

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('stock_quantity', formData.stock_quantity);
        data.append('description', formData.description);

        if (imageFile) {
            data.append('image', imageFile);
        }

        if (selectedProduct) {
            data.append('_method', 'PUT');
            router.post(`/products/${selectedProduct.id}`, data, {
                onSuccess: () => {
                    router.reload({ only: ['products', 'stats'] });
                },
            });
        } else {
            router.post('/products', data, {
                onSuccess: () => {
                    router.reload({ only: ['products', 'stats'] });
                },
            });
        }

        closeDialogueBox();
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const seconds = Math.floor(
            (new Date().getTime() - date.getTime()) / 1000,
        );

        let interval = seconds / 31536000;
        if (interval >= 1) {
            const value = Math.floor(interval);
            return value === 1 ? '1 year ago' : value + ' years ago';
        }

        interval = seconds / 2592000;
        if (interval >= 1) {
            const value = Math.floor(interval);
            return value === 1 ? '1 month ago' : value + ' months ago';
        }

        interval = seconds / 86400;
        if (interval >= 1) {
            const value = Math.floor(interval);
            return value === 1 ? '1 day ago' : value + ' days ago';
        }

        interval = seconds / 3600;
        if (interval >= 1) {
            const value = Math.floor(interval);
            return value === 1 ? '1 hour ago' : value + ' hours ago';
        }

        interval = seconds / 60;
        if (interval >= 1) {
            const value = Math.floor(interval);
            return value === 1 ? '1 minute ago' : value + ' minutes ago';
        }

        const value = Math.floor(seconds);
        return value === 1 ? '1 second ago' : value + ' seconds ago';
    };

    return (
        <div className="space-y-6">
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
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-white shadow transition hover:bg-indigo-700"
                >
                    <FaBox />
                    New Listing
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.data.map((product: any) => (
                    <div
                        key={product.id}
                        className="relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl"
                    >
                        {/* Image */}
                        <div className="h-48 w-full overflow-hidden bg-gray-50">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover transition duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col space-y-2 p-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {product.name}
                            </h2>

                            <p className="text-xl font-bold text-indigo-600">
                                $ {product.price}
                            </p>

                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Stock: {product.stock_quantity}</span>
                                <span>{formatTimeAgo(product.created_at)}</span>
                            </div>

                            {/* ✅ Make button stick to bottom */}
                            <div className="mt-auto">
                                <Link
                                    href={`/dashboard/products/${product.slug}`}
                                    className="cursor-pointer"
                                >
                                    <button className="mt-3 w-full cursor-pointer rounded-lg bg-gray-900 py-2 text-white transition hover:bg-black">
                                        View Product
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={() => handleEditProduct(product)}
                            className="absolute top-3 right-3 rounded-full bg-white p-2 shadow hover:bg-gray-100"
                        >
                            <FaEdit />
                        </button>

                        {/* Delete */}
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

            {/* Dialogue Box */}
            {dialogueBox && (
                <section
                    onClick={closeDialogueBox}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <h2 className="mb-4 text-center text-2xl font-bold">
                            {selectedProduct
                                ? 'Edit Product'
                                : 'Create Product'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-gray-50">
                                    {imagePreview ? (
                                        <>
                                            <img
                                                src={imagePreview}
                                                className="h-full w-full object-contain"
                                            />

                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 rounded-full bg-black/70 p-2 text-white hover:scale-110"
                                            >
                                                <FaTimes size={10} />
                                            </button>
                                        </>
                                    ) : (
                                        <label
                                            htmlFor="image"
                                            className="flex cursor-pointer flex-col items-center gap-2 text-gray-500"
                                        >
                                            <FaHourglass />
                                            Upload Image
                                        </label>
                                    )}
                                </div>

                                {imagePreview && (
                                    <label
                                        htmlFor="image"
                                        className="block cursor-pointer text-center text-sm text-indigo-600 hover:underline"
                                    >
                                        Update Image
                                    </label>
                                )}
                            </div>

                            {/* Inputs */}
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Product Name"
                                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                type="number"
                                placeholder="Price"
                                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                name="stock_quantity"
                                value={formData.stock_quantity}
                                onChange={handleChange}
                                type="number"
                                placeholder="Stock Quantity"
                                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                            />

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                            />

                            <button className="w-full cursor-pointer rounded-lg bg-indigo-600 py-2 text-white transition hover:bg-indigo-700">
                                {selectedProduct
                                    ? 'Update Product'
                                    : 'Create Product'}
                            </button>
                        </form>
                    </div>
                </section>
            )}

            {/* ✅ DELETE CONFIRMATION MODAL */}
            {deleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-gray-800">
                            Delete Product
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold">
                                {productToDelete?.name}
                            </span>
                            ?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setDeleteModal(false);
                                    setProductToDelete(null);
                                }}
                                className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDeleteProduct}
                                className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                                Yes, Delete
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
