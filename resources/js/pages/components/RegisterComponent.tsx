import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import SMILEY_PIC from '/public/smiley_pic.jpg';
import { toast, Toaster } from 'sonner';

const RegisterComponent = () => {
    // const [fullName, setFullName] = useState<string>('');
    // const [email, setEmail] = useState<string>('');
    // const [password, setPassword] = useState<string>('');
    // const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { data, setData, errors, post, processing } = useForm({
        fullName: '',
        email: '',
        password: '',
        dateOfBirth: '',
    });

    const handleRegister = (e: any) => {
        e.preventDefault();
        // // Basic validation
        // if (!data.fullName?.trim() || !data.email?.trim() || !data.password.trim()) {
        //     setErrorMessage('This input field is required');
        //     return;
        // } else {
        //     setErrorMessage('');
        // }

        try {
            
            
            post('/register', {
                onError: (errors) => {
                    Object.values(errors).forEach((error: any) => {
                        toast.error(error);
                    });
                },
                onSuccess: () => {
                    // console.log('Registration successful:', response);
                    toast.success('Account created successfully!');
                    // setTimeout(() => setSuccessMessage(''), 3000);
                    setTimeout(() => {
                        router.get('/verify-email');
                    }, 3000);
                },
                // onFinish: () => {
                //     toast.info('Registration request finished');
                // },
            });
        } catch (error: unknown) {
            toast.error(error.message || 'An error occured. Try again later.');
        }
    };

    return (
        <section className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-12">
            <Toaster richColors position="top-right" />

            <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-10 shadow-xl">
                <div className="mb-5 text-center">
                    <h3 className="flex items-center justify-center text-3xl font-bold text-gray-900">
                        Create Acc
                        <span>
                            <img
                                src={SMILEY_PIC}
                                width={35}
                                alt="smiley_pic"
                                className="object-contain"
                            />
                        </span>
                        unt
                    </h3>
                    <p className="mt-2 mb-0 text-gray-500">
                        Shop with the best retail store today
                    </p>
                </div>
                <p className="text-center">{successMessage}</p>
                <form onSubmit={handleRegister} className="space-y-5">
                    {/* <p className="m-0 text-center">{successMessage}</p> */}
                    <input
                        type="text"
                        value={data.fullName}
                        onChange={(e) => setData('fullName', e.target.value)}
                        placeholder="Full Name"
                        className="m-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 transition focus:bg-white focus:ring-2 focus:ring-blue-400"
                    />
                    <p className="ml-2 text-red-500">{errors.fullName}</p>
                    {/* {!fullName && (
                        <p className="m-0 text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )} */}
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Email"
                        className="m-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 transition focus:bg-white focus:ring-2 focus:ring-blue-400"
                    />
                    {<p className="ml-2 text-red-500">{errors.email}</p>}

                    <input
                        type="date"
                        value={data.dateOfBirth}
                        onChange={(e) => setData('dateOfBirth', e.target.value)}
                        placeholder="Date of Birth(DD/MM/YYYY)"
                        className="m-2 w-full uppercase rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 transition focus:bg-white focus:ring-2 focus:ring-blue-400"
                    />
                    {<p className="ml-2 text-red-500">{errors.dateOfBirth}</p>}

                    <div className="relative m-0">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Password"
                            className="m-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 pr-16 transition focus:bg-white focus:ring-2 focus:ring-blue-400"
                        />
                        <p className="ml-2 text-red-500">{errors.password}</p>
                        {data.password && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-5 right-3 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        )}
                    </div>
                    {/* {!password && (
                        <p className="m-0 text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )} */}
                    <button
                        disabled={processing}
                        className={`${processing ? 'cursor-not-allowed' : 'cursor-pointer'} m-2 w-full rounded-xl disabled:opacity-25 bg-blue-600 py-4 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95`}
                    >
                        {processing ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <p className="m-2">
                    Already have an account?{' '}
                    <button
                        onClick={() => router.get('/login')}
                        className="cursor-pointer text-blue-500 hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </section>
    );
};

export default RegisterComponent;
