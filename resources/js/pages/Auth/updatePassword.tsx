import { useState } from 'react';

const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };
    const toggleConfirmNewPasswordVisibility = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="border-l-4 border-emerald-500 pl-3 text-xl font-semibold text-slate-800">
                    Set New Password
                </h2>
                <form className="mt-8 space-y-6">
                    <div className="relative">
                        <input
                            value={currentPassword.trim()}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="Current Password"
                            className="w-full rounded border border-slate-200 bg-slate-50 p-3 pr-15 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        {currentPassword && (
                            <button
                                type="button"
                                onClick={toggleCurrentPasswordVisibility}
                                className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showCurrentPassword ? 'Hide' : 'Show'}
                            </button>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            value={password.trim()}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            className="w-full rounded border border-slate-200 bg-slate-50 p-3 pr-15 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        {password && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            value={confirmNewPassword.trim()}
                            onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                            }
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            className="w-full rounded border border-slate-200 bg-slate-50 p-3 pr-15 outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        {confirmNewPassword && (
                            <button
                                type="button"
                                onClick={toggleConfirmNewPasswordVisibility}
                                className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showConfirmNewPassword ? 'Hide' : 'Show'}
                            </button>
                        )}
                    </div>
                    <button className="w-full cursor-pointer rounded bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700">
                        Save Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
