import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { FaTruck, FaCheckCircle } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import Dashboard from '@/pages/Home/Dashboard';

const Settings = () => {
    const { deliveryFee, freeDeliveryThreshold }: any = usePage().props;

    const [form, setForm] = useState({
        delivery_fee: deliveryFee,
        free_delivery_threshold: freeDeliveryThreshold,
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        router.put('/admin/settings', form, {
            onSuccess: () => toast.success('Settings saved successfully'),
            onError: () => toast.error('Failed to save settings'),
            onFinish: () => setSaving(false),
        });
    };

    return (
        <div className="max-w-2xl space-y-6">
            <Toaster richColors position="top-right" />

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
                <p className="text-sm text-gray-500">
                    Configure delivery fees for your marketplace.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <FaTruck />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900">Delivery Settings</h2>
                        <p className="text-xs text-gray-500">All amounts are in Naira (₦)</p>
                    </div>
                </div>

                <div className="space-y-5">
                    {/* Delivery Fee */}
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                            Flat Delivery Fee (₦)
                        </label>
                        <p className="mb-2 text-xs text-gray-400">
                            This fee is added to every order that doesn't qualify for free delivery.
                        </p>
                        <div className="relative">
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 font-bold text-gray-400">₦</span>
                            <input
                                type="number"
                                name="delivery_fee"
                                value={form.delivery_fee}
                                onChange={handleChange}
                                min={0}
                                required
                                className="w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-8 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </div>

                    {/* Free Delivery Threshold */}
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                            Free Delivery Threshold (₦)
                        </label>
                        <p className="mb-2 text-xs text-gray-400">
                            Orders at or above this amount automatically get free delivery.
                        </p>
                        <div className="relative">
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 font-bold text-gray-400">₦</span>
                            <input
                                type="number"
                                name="free_delivery_threshold"
                                value={form.free_delivery_threshold}
                                onChange={handleChange}
                                min={0}
                                required
                                className="w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-8 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </div>

                    {/* Live preview */}
                    <div className="rounded-xl border border-indigo-50 bg-indigo-50 p-4 text-sm text-indigo-800">
                        <p className="font-semibold">Preview:</p>
                        <p className="mt-1">
                            Orders below{' '}
                            <span className="font-bold">
                                ₦{Number(form.free_delivery_threshold).toLocaleString('en-NG')}
                            </span>{' '}
                            → delivery fee of{' '}
                            <span className="font-bold">
                                ₦{Number(form.delivery_fee).toLocaleString('en-NG')}
                            </span>
                        </p>
                        <p className="mt-0.5">
                            Orders at or above{' '}
                            <span className="font-bold">
                                ₦{Number(form.free_delivery_threshold).toLocaleString('en-NG')}
                            </span>{' '}
                            → <span className="font-bold text-green-700">FREE delivery</span>
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <FaCheckCircle />
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>
            </form>
        </div>
    );
};

Settings.layout = (page: any) => <Dashboard>{page}</Dashboard>;
export default Settings;