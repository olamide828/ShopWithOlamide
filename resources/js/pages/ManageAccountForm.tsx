import { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { FiUser, FiLock, FiAlertTriangle } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ManageAccountForm = () => {
    const { auth }: any = usePage().props;
    const user = auth?.user;

    const [activeTab, setActiveTab] = useState('profile');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [editDob, setEditDob] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editName, setEditName] = useState(false);

    const toggleEditName = () => {
        setEditName(true);
    };

    const toggleEditEmail = () => {
        setEditEmail(true);
    };

    const toggleEditDob = () => {
        setEditDob(true);
    };

    const toggleCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const profileForm = useForm({
        name: user?.name || '',
        email: user?.email || '',
        dateOfBirth: user?.dateOfBirth || '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const deleteForm = useForm({
        password: '',
    });

    const toggleDeleteModal = () => {
        toast.warning(
            'Warning: This action is irreversible. And you may lose data associated with your account.',
        );
        setShowDeleteModal(true);
    };

    // HANDLERS
    const updateProfile = (e: any) => {
        e.preventDefault();

        profileForm.put('/user/update', {
            onSuccess: () => {
                setEditDob(false);
                setEditEmail(false);
                setEditName(false);
                toast.success('Profile updated successfully');
            },
            onError: () => {
                setEditDob(false);
                setEditEmail(false);
                setEditName(false);
                toast.error('Something went wrong');
            },
            onFinish: () => {
                setEditDob(false);
                setEditEmail(false);
                setEditName(false);
            },
        });
    };

    const updatePassword = (e: any) => {
        e.preventDefault();

        passwordForm.put('/user/password', {
            onSuccess: () => {
                toast.success('Password updated');
                passwordForm.reset();
            },
            onError: (errors) =>
                toast.error(
                    errors.message || 'Check your inputs and try again',
                ),
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
            <Head title="Manage your account preference - ShopWithOlamide"></Head>

            <div className="mx-auto max-w-6xl">
                {/* HEADER */}
                <div className="mb-8 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                            Settings
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage your account preferences
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={() => router.get('/dashboard')}
                            className="w-full cursor-pointer rounded-xl bg-indigo-600 px-6 py-2.5 text-white transition hover:bg-indigo-700"
                        >
                            Done
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-6 md:flex-row">
                    {/* SIDEBAR */}
                    <div className="flex gap-2 rounded-2xl border border-gray-200 bg-white/70 p-3 shadow-sm backdrop-blur-xl md:w-64 md:flex-col">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                                    activeTab === tab.key
                                        ? 'bg-indigo-600 text-white shadow'
                                        : 'text-gray-600 hover:bg-gray-100'
                                } `}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 space-y-6">
                        {/* CARD */}
                        <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all">
                            {/* PROFILE */}
                            {activeTab === 'profile' && (
                                <>
                                    <h2 className="mb-6 text-lg font-semibold">
                                        Profile
                                    </h2>

                                    <form
                                        onSubmit={updateProfile}
                                        className="space-y-4"
                                    >
                                        <label htmlFor="fullName">
                                            Full Name:
                                        </label>
                                        {/*Edit Name*/}
                                        {!editName && (
                                            <div className="relative">
                                                <input
                                                    id="fullName"
                                                    type="text"
                                                    readOnly
                                                    value={
                                                        profileForm.data.name
                                                    }
                                                    className="w-full rounded-xl py-3 outline-none"
                                                    placeholder="Full Name"
                                                />
                                                <button
                                                    onClick={toggleEditName}
                                                    className="absolute top-3 right-10 cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}

                                        {editName && (
                                            <div>
                                                <input
                                                    id="fullName"
                                                    type="text"
                                                    value={
                                                        profileForm.data.name
                                                    }
                                                    onChange={(e) =>
                                                        profileForm.setData(
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="Full Name"
                                                />
                                                {profileForm.errors.name && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {
                                                            profileForm.errors
                                                                .name
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/*Edit Email*/}
                                        <label htmlFor="email">Email:</label>
                                        {!editEmail && (
                                            <div className="relative">
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={
                                                        profileForm.data.email
                                                    }
                                                    readOnly
                                                    className="w-full rounded-xl py-3 outline-none"
                                                    placeholder="Email"
                                                />
                                                <button
                                                    onClick={toggleEditEmail}
                                                    className="absolute top-3 right-10 cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}
                                        {editEmail && (
                                            <div>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={
                                                        profileForm.data.email
                                                    }
                                                    onChange={(e) =>
                                                        profileForm.setData(
                                                            'email',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="Email"
                                                />
                                                {profileForm.errors.email && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {
                                                            profileForm.errors
                                                                .email
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/*Edit DOB*/}
                                        <label htmlFor="">
                                            {editDob
                                                ? 'DOB: (DD-MM-YYYY)'
                                                : 'DOB: (YYYY-MM-DD)'}
                                        </label>
                                        {!editDob && (
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value={
                                                        profileForm.data
                                                            .dateOfBirth
                                                    }
                                                    className="w-full rounded-xl py-3 uppercase outline-none"
                                                />

                                                <button
                                                    onClick={toggleEditDob}
                                                    className="absolute top-3 right-10 cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}

                                        {editDob && (
                                            <div>
                                                <input
                                                    type="date"
                                                    value={
                                                        profileForm.data
                                                            .dateOfBirth
                                                    }
                                                    onChange={(e) =>
                                                        profileForm.setData(
                                                            'dateOfBirth',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-xl border px-4 py-3 uppercase outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                                {profileForm.errors
                                                    .dateOfBirth && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {
                                                            profileForm.errors
                                                                .dateOfBirth
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        <button
                                            disabled={profileForm.processing}
                                            className="w-full cursor-pointer rounded-xl bg-indigo-600 px-6 py-2.5 text-white transition hover:bg-indigo-700 disabled:opacity-50 md:w-auto"
                                        >
                                            {profileForm.processing
                                                ? 'Saving...'
                                                : 'Save'}
                                        </button>
                                    </form>
                                </>
                            )}

                            {/* SECURITY */}
                            {activeTab === 'security' && (
                                <>
                                    <h2 className="mb-6 text-lg font-semibold">
                                        Security
                                    </h2>

                                    <form
                                        onSubmit={updatePassword}
                                        className="space-y-4"
                                    >
                                        <div className="relative">
                                            <input
                                                type={
                                                    showCurrentPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="Current Password"
                                                value={
                                                    passwordForm.data
                                                        .current_password
                                                }
                                                onChange={(e) =>
                                                    passwordForm.setData(
                                                        'current_password',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border px-4 py-3"
                                            />
                                            {passwordForm.data
                                                .current_password && (
                                                <>
                                                    {!showCurrentPassword ? (
                                                        <FaEye
                                                            onClick={
                                                                toggleCurrentPassword
                                                            }
                                                            className="absolute top-4 right-5 cursor-pointer text-xl text-gray-600"
                                                        />
                                                    ) : (
                                                        <FaEyeSlash
                                                            onClick={
                                                                toggleCurrentPassword
                                                            }
                                                            className="absolute top-4 right-5 cursor-pointer text-xl text-gray-600"
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        {passwordForm.errors
                                            .current_password && (
                                            <p className="text-xs text-red-500">
                                                {
                                                    passwordForm.errors
                                                        .current_password
                                                }
                                            </p>
                                        )}

                                        <div className="relative">
                                            <input
                                                type={
                                                    showNewPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="New Password"
                                                value={
                                                    passwordForm.data.password
                                                }
                                                onChange={(e) =>
                                                    passwordForm.setData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border px-4 py-3"
                                            />
                                            {passwordForm.data.password && (
                                                <>
                                                    {!showNewPassword ? (
                                                        <FaEye
                                                            onClick={
                                                                toggleNewPassword
                                                            }
                                                            className="absolute top-4 right-5 cursor-pointer text-xl text-gray-600"
                                                        />
                                                    ) : (
                                                        <FaEyeSlash
                                                            onClick={
                                                                toggleNewPassword
                                                            }
                                                            className="absolute top-4 right-5 cursor-pointer text-xl text-gray-600"
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="Confirm Password"
                                                value={
                                                    passwordForm.data
                                                        .password_confirmation
                                                }
                                                onChange={(e) =>
                                                    passwordForm.setData(
                                                        'password_confirmation',
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border px-4 py-3"
                                            />
                                            {passwordForm.data
                                                .password_confirmation && (
                                                <>
                                                    {!showConfirmPassword ? (
                                                        <FaEye
                                                            onClick={
                                                                toggleConfirmPassword
                                                            }
                                                            className="absolute top-4 right-5 cursor-pointer text-xl text-gray-600"
                                                        />
                                                    ) : (
                                                        <FaEyeSlash
                                                            onClick={
                                                                toggleConfirmPassword
                                                            }
                                                            className="absolute top-4 right-5 cursor-pointer text-xl text-gray-600"
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <button
                                            disabled={passwordForm.processing}
                                            className="cursor-pointer rounded-xl bg-indigo-600 px-6 py-2.5 text-white transition hover:bg-indigo-700"
                                        >
                                            {passwordForm.processing
                                                ? 'Updating...'
                                                : 'Update Password'}
                                        </button>
                                    </form>
                                </>
                            )}

                            {/* DANGER */}
                            {activeTab === 'danger' && (
                                <>
                                    <h2 className="mb-4 text-lg font-semibold text-red-600">
                                        Danger Zone
                                    </h2>

                                    <p className="mb-6 text-sm text-gray-500">
                                        This action is irreversible.
                                    </p>

                                    <button
                                        onClick={toggleDeleteModal}
                                        className="cursor-pointer rounded-xl bg-red-600 px-6 py-2.5 text-white transition hover:bg-red-700"
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
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                        <div className="animate-in fade-in zoom-in w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl">
                            <h3 className="text-lg font-bold">
                                Confirm Deletion
                            </h3>

                            <p className="text-sm text-gray-500">
                                Enter your password to delete your account
                                permanently.
                            </p>

                            <input
                                type="password"
                                placeholder="Password"
                                value={deleteForm.data.password}
                                onChange={(e) =>
                                    deleteForm.setData(
                                        'password',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-xl border px-4 py-3"
                            />

                            {deleteForm.errors.password && (
                                <p className="text-sm text-red-500">
                                    {deleteForm.errors.password}
                                </p>
                            )}

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="cursor-pointer rounded-xl bg-gray-100 px-4 py-2"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={deleteAccount}
                                    disabled={deleteForm.processing}
                                    className="cursor-pointer rounded-xl bg-red-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-45"
                                >
                                    {deleteForm.processing
                                        ? 'Deleting...'
                                        : 'Delete'}
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
