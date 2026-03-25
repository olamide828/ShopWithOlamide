import React from 'react';

// Put the interface right here at the top

const VerifyEmail = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-xl">
                {/* Animated-style Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-slate-800">
                    Check your email
                </h2>
                <p className="mt-4 leading-relaxed text-slate-600">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you?
                </p>

                {status === 'verification-link-sent' && (
                    <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-600">
                        A new verification link has been sent to your email
                        address.
                    </div>
                )}

                <div className="mt-8 flex flex-col gap-3">
                    <button className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white shadow-md transition-all hover:bg-slate-800">
                        Resend Verification Email
                    </button>

                    <button className="text-sm font-medium text-slate-400 underline decoration-2 underline-offset-4 hover:text-slate-600">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
