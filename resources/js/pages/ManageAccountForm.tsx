import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { FiUser, FiLock, FiAlertTriangle } from 'react-icons/fi';

const ManageAccountForm = () => {
    const { auth }: any = usePage().props;
    const user = auth?.user;

    const [activeTab, setActiveTab] = useState('profile');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const profileForm = useForm({
        name: user?.name || '',
        email: user?.email || '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const deleteForm = useForm({
        password: '',
    });

    // HANDLERS
    const updateProfile = (e: any) => {
        e.preventDefault();

        profileForm.put('/user/update', {
            onSuccess: () => toast.success('Profile updated successfully'),
            onError: () => toast.error('Something went wrong'),
        });
    };

    const updatePassword = (e: any) => {
        e.preventDefault();

        passwordForm.put('/user/password', {
            onSuccess: () => {
                toast.success('Password updated');
                passwordForm.reset();
            },
            onError: () => toast.error('Check your inputs'),
        });
    };

    const deleteAccount = () => {
        deleteForm.delete('/user/delete', {
            onSuccess: () => toast.success('Account deleted'),
            onError: () => toast.error('Incorrect password'),
        });
    };

    const tabs = [
        { key: 'profile', label: 'Profile', icon: <FiUser /> },
        { key: 'security', label: 'Security', icon: <FiLock /> },
        { key: 'danger', label: 'Danger', icon: <FiAlertTriangle /> },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-10">
            <Toaster position="top-right" richColors />

            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                        Settings
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your account preferences
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">

                    {/* SIDEBAR */}
                    <div className="flex md:flex-col gap-2 md:w-64 bg-white/70 backdrop-blur-xl border border-gray-200 p-3 rounded-2xl shadow-sm">

                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                                    ${activeTab === tab.key
                                        ? 'bg-indigo-600 text-white shadow'
                                        : 'text-gray-600 hover:bg-gray-100'}
                                `}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 space-y-6">

                        {/* CARD */}
                        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm transition-all">

                            {/* PROFILE */}
                            {activeTab === 'profile' && (
                                <>
                                    <h2 className="text-lg font-semibold mb-6">Profile</h2>

                                    <form onSubmit={updateProfile} className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                value={profileForm.data.name}
                                                onChange={(e) =>
                                                    profileForm.setData('name', e.target.value)
                                                }
                                                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                                placeholder="Full Name"
                                            />
                                            {profileForm.errors.name && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {profileForm.errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <input
                                                type="email"
                                                value={profileForm.data.email}
                                                onChange={(e) =>
                                                    profileForm.setData('email', e.target.value)
                                                }
                                                className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                                placeholder="Email"
                                            />
                                            {profileForm.errors.email && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {profileForm.errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            disabled={profileForm.processing}
                                            className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
                                        >
                                            {profileForm.processing ? 'Saving...' : 'Save'}
                                        </button>
                                    </form>
                                </>
                            )}

                            {/* SECURITY */}
                            {activeTab === 'security' && (
                                <>
                                    <h2 className="text-lg font-semibold mb-6">Security</h2>

                                    <form onSubmit={updatePassword} className="space-y-4">

                                        <input
                                            type="password"
                                            placeholder="Current Password"
                                            value={passwordForm.data.current_password}
                                            onChange={(e) =>
                                                passwordForm.setData('current_password', e.target.value)
                                            }
                                            className="w-full rounded-xl border px-4 py-3"
                                        />

                                        {passwordForm.errors.current_password && (
                                            <p className="text-red-500 text-xs">
                                                {passwordForm.errors.current_password}
                                            </p>
                                        )}

                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            value={passwordForm.data.password}
                                            onChange={(e) =>
                                                passwordForm.setData('password', e.target.value)
                                            }
                                            className="w-full rounded-xl border px-4 py-3"
                                        />

                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={passwordForm.data.password_confirmation}
                                            onChange={(e) =>
                                                passwordForm.setData('password_confirmation', e.target.value)
                                            }
                                            className="w-full rounded-xl border px-4 py-3"
                                        />

                                        <button
                                            disabled={passwordForm.processing}
                                            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                                        >
                                            {passwordForm.processing ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </form>
                                </>
                            )}

                            {/* DANGER */}
                            {activeTab === 'danger' && (
                                <>
                                    <h2 className="text-lg font-semibold text-red-600 mb-4">
                                        Danger Zone
                                    </h2>

                                    <p className="text-sm text-gray-500 mb-6">
                                        This action is irreversible.
                                    </p>

                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                                    >
                                        Delete Account
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* MODAL */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4 animate-in fade-in zoom-in">

                            <h3 className="text-lg font-bold">Confirm Deletion</h3>

                            <p className="text-sm text-gray-500">
                                Enter your password to delete your account permanently.
                            </p>

                            <input
                                type="password"
                                placeholder="Password"
                                value={deleteForm.data.password}
                                onChange={(e) =>
                                    deleteForm.setData('password', e.target.value)
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />

                            {deleteForm.errors.password && (
                                <p className="text-red-500 text-sm">
                                    {deleteForm.errors.password}
                                </p>
                            )}

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 bg-gray-100 rounded-xl"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={deleteAccount}
                                    className="px-4 py-2 bg-red-600 text-white rounded-xl"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAccountForm;