import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const ViewProduct = () => {
    const { product }: any = usePage().props;

    const [editing, setEditing] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        stock_quantity: product.stock_quantity,
        description: product.description || "",
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

    const handleUpdate = (e: any) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("stock_quantity", formData.stock_quantity);
        data.append("description", formData.description);
        data.append("_method", "PUT");

        if (imageFile) {
            data.append("image", imageFile);
        }

        router.post(`/shop/u/products/${product.id}`, data, {
            onSuccess: () => setEditing(false),
        });
    };

    const handleDelete = () => {
        router.delete(`/shop/u/products/${product.id}`, {
            onSuccess: () => {
                router.visit("/admin/products");
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b p-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Product Details
                    </h1>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setEditing(!editing)}
                            className="flex items-center gap-2 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                        >
                            <FaEdit />
                            {editing ? "Cancel" : "Edit"}
                        </button>

                        <button
                            onClick={() => setDeleteModal(true)}
                            className="flex items-center cursor-pointer gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                            <FaTrash />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 p-6">
                    
                    {/* Image */}
                    <div className="relative h-105 group overflow-hidden rounded-xl border bg-white">
                        <img
                            src={imagePreview}
                            className="w-full h-full object-contain  cursor-zoom-in transition-transform duration-300 group-hover:scale-110"
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
                                    className="w-full border rounded-lg px-4 py-2"
                                />

                                <input
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                />

                                <input
                                    name="stock_quantity"
                                    type="number"
                                    value={formData.stock_quantity}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                />

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                />

                                <button className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-gray-800">
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
                                    className="bg-green-600 p-2 rounded-md cursor-pointer hover:bg-green-700/80 w-[100px]"
                                    onClick={() => router.get("/admin/products")}
                                    >Done</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* DELETE MODAL */}
            {deleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold">
                            Delete Product
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">
                                {product.name}
                            </span>
                            ?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteModal(false)}
                                className="px-4 cursor-pointer py-2 bg-gray-200 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg"
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