import { router, useForm } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

const SellerRegisterPage = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'seller',
    });

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        post('/seller/register', {
            onSuccess: () => toast.success('Account created 🎉'),
            onError: (errors) => {
                Object.values(errors).forEach((error: any) => {
                    toast.error(error);
                });
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <Toaster richColors position="top-right" />

            <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl">
                {/* LEFT */}
                <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-purple-600 to-indigo-600 p-10 text-white md:flex">
                    <div>
                        <h1 className="mb-4 text-3xl font-bold">
                            Start selling today 💰
                        </h1>
                        <p className="text-indigo-200">
                            Join thousands of sellers growing their businesses.
                        </p>
                    </div>

                    <div className="text-sm text-indigo-200">
                        Fast setup • Zero stress • Instant reach
                    </div>
                </div>

                {/* FORM */}
                <div className="w-full p-8 md:w-1/2 md:p-12">
                    <h2 className="mb-2 text-2xl font-bold text-gray-800">
                        Create Seller Account
                    </h2>
                    <p className="mb-6 text-sm text-gray-500">
                        It takes less than a minute
                    </p>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full rounded-xl border px-4 py-3"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded-xl border px-4 py-3"
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}

                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="w-full rounded-xl border px-4 py-3"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            className="w-full rounded-xl border px-4 py-3"
                        />

                        <button
                            disabled={processing}
                            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
                        >
                            {processing ? 'Creating...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already a seller?{' '}
                        <button
                            onClick={() => router.get('/seller/login')}
                            className="font-semibold text-indigo-600 hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SellerRegisterPage;
