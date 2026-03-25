import React from "react";

const ForgotPassword = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="w-full max-w-sm px-4 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                    <span className="text-2xl">🔑</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                    Forgot Password?
                </h2>
                <p className="mt-2 mb-8 text-gray-500">
                    No worries, we'll send you reset instructions.
                </p>
                <form className="text-left">
                    <label className="text-xs font-bold text-gray-400 uppercase">
                        Email
                    </label>
                    <input
                        type="email"
                        className="mt-2 w-full border-b-2 border-gray-200 py-2 transition-colors focus:border-yellow-500 focus:outline-none"
                    />
                    <button className="mt-8 w-full cursor-pointer rounded-full bg-black py-3 font-medium text-white hover:bg-gray-800">
                        Reset Password
                    </button>
                </form>
                <a
                    href="/login"
                    className="mt-6 block text-sm w-fit m-auto cursor-pointer text-gray-400 hover:text-gray-600"
                >
                    ← Back to login
                </a>
            </div>
        </div>
    );
};

export default ForgotPassword;
