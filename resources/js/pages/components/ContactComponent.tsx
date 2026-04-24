import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaClock,
    FaInstagram,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { toast, Toaster } from 'sonner';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactComponent = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (error) setError(null);
        if (success) setSuccess(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.email || !formData.name || !formData.message) {
            toast.error('All fields are required, and cannot be empty');
            return;
        }

        setProcessing(true);
        setError(null);
        setSuccess(null);

        router.post('/contact', formData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Message sent successfully');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });

                setTimeout(() => {
                    setSuccess('');
                }, 3000);
            },
            onError: () => {
                toast.error(
                    'Unable to send your message right now. Check your internet and try again in a few moments.',
                );
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    return (
        <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Toaster richColors position="top-right" />
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px]">
                {/* Contact Info Card - SAFARI FIXED */}
                <div className="relative overflow-hidden rounded-3xl bg-indigo-700 bg-gradient-to-br from-[#4f46e5ee] to-[#000000cc] p-8 text-white shadow-2xl lg:p-10">
                    <div className="relative z-10 max-w-md">
                        <span
                            style={{ WebkitBackdropFilter: 'blur(12px)' }}
                            className="mb-2 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-[0.2em] text-indigo-200 uppercase backdrop-blur-md"
                        >
                            Contact Us
                        </span>

                        <h2 className="text-3xl leading-tight font-bold sm:text-4xl">
                            We'd love to hear from you
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-white/85 sm:text-base">
                            Have a question, feedback, or need help with an
                            order? Send us a message and our team will respond
                            as quickly as possible.
                        </p>
                    </div>

                    <div className="relative z-10 mt-10 space-y-5">
                        {/* Info Row 1 */}
                        <div
                            style={{ WebkitBackdropFilter: 'blur(8px)' }}
                            className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                        >
                            <div className="mt-1 rounded-xl bg-white/15 p-3">
                                <FaEnvelope className="text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Email</p>
                                <a
                                    href="mailto:support@shopwitholamide.com"
                                    className="mt-1 block font-medium transition hover:text-white/80"
                                >
                                    support@shopwitholamide.com
                                </a>
                            </div>
                        </div>

                        {/* Info Row 2 */}
                        <div
                            style={{ WebkitBackdropFilter: 'blur(8px)' }}
                            className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                        >
                            <div className="mt-1 rounded-xl bg-white/15 p-3">
                                <FaPhoneAlt className="text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Phone</p>
                                <a
                                    href="tel:+2349070079206"
                                    className="mt-1 block font-medium transition hover:text-white/80"
                                >
                                    +234 907 007 9206
                                </a>
                            </div>
                        </div>

                        {/* Info Row 3 */}
                        <div
                            style={{ WebkitBackdropFilter: 'blur(8px)' }}
                            className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                        >
                            <div className="mt-1 rounded-xl bg-white/15 p-3">
                                <FaMapMarkerAlt className="text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Address</p>
                                <p className="mt-1 font-medium">
                                    123 Olamide Street, Lagos, Nigeria
                                </p>
                            </div>
                        </div>

                        {/* Info Row 4 */}
                        <div
                            style={{ WebkitBackdropFilter: 'blur(8px)' }}
                            className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                        >
                            <div className="mt-1 rounded-xl bg-white/15 p-3">
                                <FaClock className="text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">
                                    Business Hours
                                </p>
                                <div className="mt-1 space-y-1 text-sm font-medium">
                                    <p>Mon - Fri: 9:00am - 5:00pm WAT</p>
                                    <p>Saturday: 10:00am - 3:00pm WAT</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-10 flex items-center gap-4">
                        <a
                            href="https://instagram.com/shopwitholamide"
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl transition hover:-translate-y-1 hover:bg-white/20"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://x.com/@shopwitholamide"
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl transition hover:-translate-y-1 hover:bg-white/20"
                        >
                            <FaXTwitter />
                        </a>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">
                            Send a Message
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Fill out the form below and we’ll reply shortly.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="subject"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="What is this regarding?"
                                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Tell us how we can help you..."
                                className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-70"
                        >
                            {processing ? 'Sending Message...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactComponent;
