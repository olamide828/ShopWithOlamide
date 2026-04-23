import React, { useState } from 'react';
import { usePage, router, Head } from '@inertiajs/react';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';

const ViewProduct = () => {
    const { product }: any = usePage().props;

    const [editing, setEditing] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        stock_quantity: product.stock_quantity,
        description: product.description || '',
    });

    const [imagePreview, setImagePreview] = useState(product.image);
    const [imageFile, setImageFile] = useState<any>(null);

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

    const reload = () => {
        window.location.reload();
    };

    const handleUpdate = (e: any) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('stock_quantity', formData.stock_quantity);
        data.append('description', formData.description);
        data.append('_method', 'PUT');

        if (imageFile) {
            data.append('image', imageFile);
        }

        router.post(`/admin/products/${product.id}`, data, {
            onSuccess: () => {
                (setEditing(false), reload());
                toast.success('Product updated successfully');
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

    return (
        <div className="flex min-h-screen justify-center bg-gray-50 p-6">
            <Toaster richColors position="top-right" />
            <Head title={`${product.name} - ShopWithOlamide`}></Head>
            {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed odit
            tempora quibusdam? Eius saepe, quae distinctio repellat eaque esse
            aspernatur in ab, et assumenda quidem voluptas ducimus nostrum
            dolorem consequuntur explicabo ut ullam deserunt soluta totam
            aliquid quos nobis! Provident, quod. Id veritatis quae nostrum
            perferendis laborum magnam ratione alias. */}
            <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b p-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Product Details
                    </h1>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setEditing(!editing)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                        >
                            <FaEdit />
                            {editing ? 'Cancel' : 'Edit'}
                        </button>

                        <button
                            onClick={() => setDeleteModal(true)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                            <FaTrash />
                            Delete
                        </button>
                    </div>
                </div>
                <div className="grid gap-8 p-6 md:grid-cols-2">
                    {/* Image */}
                    <div className="group relative h-105 overflow-hidden rounded-xl border bg-white">
                        <img
                            alt={product.slug}
                            src={imagePreview}
                            className="h-full w-full cursor-zoom-in object-contain transition-transform duration-300 group-hover:scale-110"
                        />

                        {editing && (
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="absolute bottom-4 left-4 text-sm"
                            />
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                        {editing ? (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2"
                                />

                                <input
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2"
                                />

                                <input
                                    name="stock_quantity"
                                    type="number"
                                    value={formData.stock_quantity}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2"
                                />

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border px-4 py-2"
                                />

                                <button className="w-full cursor-pointer rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700">
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-gray-800 capitalize">
                                    {product.name}
                                </h2>

                                <p className="text-3xl font-bold text-indigo-600">
                                    ${product.price}
                                </p>

                                <p className="text-gray-500">
                                    {product.description}
                                </p>

                                <div className="text-sm text-gray-600">
                                    Stock: {product.stock_quantity}
                                </div>

                                <div className="mt-10">
                                    <button
                                        className="w-[100px] cursor-pointer rounded-md bg-green-600 p-2 hover:bg-green-700/80"
                                        onClick={() =>
                                            router.get('/admin/products')
                                        }
                                    >
                                        Done
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* DELETE MODAL */}
            {deleteModal && (
                <div className="fixed inset-0 px-6 z-50 flex items-center justify-center bg-black/60">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <h2 className="text-xl font-bold">Delete Product</h2>

                        <p className="mt-2 text-gray-600">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold">
                                {product.name}
                            </span>
                            ?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewProduct;
