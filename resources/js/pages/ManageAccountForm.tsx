import { useForm } from '@inertiajs/react';
import React from 'react';

const ManageAccountForm = ({ user }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/user/update', {
            onSuccess: () => alert('Account updated successfully!'),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                />
            </div>

            <button
                type="submit"
                disabled={processing}
                className="rounded-lg bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
                Update Account
            </button>
        </form>
    );
};

export default ManageAccountForm;