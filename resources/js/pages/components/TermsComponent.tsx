import React from 'react';

const TermsComponent = () => {
    const sections = [
        {
            title: 'Acceptance of Terms',
            content:
                'By accessing or using this platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use the website or services.',
        },
        {
            title: 'User Accounts',
            content:
                'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must provide accurate and complete information when creating an account.',
        },
        {
            title: 'Purchases & Payments',
            content:
                'All purchases made through the platform are subject to product availability and successful payment processing. Prices may change at any time without prior notice.',
        },
        {
            title: 'Prohibited Activities',
            content:
                'You agree not to misuse the platform, attempt unauthorized access, distribute malicious software, interfere with services, or violate any applicable laws.',
        },
        {
            title: 'Intellectual Property',
            content:
                'All content, branding, graphics, logos, product listings, and software on this platform are owned by or licensed to us and may not be copied, reproduced, or redistributed without permission.',
        },
        {
            title: 'Termination',
            content:
                'We reserve the right to suspend or terminate your access to the platform at any time if you violate these Terms and Conditions or engage in harmful behavior.',
        },
        {
            title: 'Limitation of Liability',
            content:
                'We are not liable for indirect, incidental, or consequential damages resulting from the use of the platform, including loss of data, profits, or business opportunities.',
        },
        {
            title: 'Changes to These Terms',
            content:
                'We may revise these Terms and Conditions at any time. Continued use of the platform after updates means you accept the revised terms.',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
                <div className="absolute top-[-60px] left-[-60px] h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
                <div className="absolute right-[-100px] bottom-[-100px] h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />

                <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-12">
                    <div className="max-w-3xl">
                        <span className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1 text-sm font-semibold tracking-[0.25em] text-purple-300 uppercase">
                            Legal Agreement
                        </span>

                        <h1 className="mt-6 text-5xl leading-tight font-black md:text-6xl">
                            Terms &
                            <span className="block bg-gradient-to-r from-purple-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                                Conditions
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            These Terms and Conditions govern your use of our
                            platform. Please read them carefully before creating
                            an account, making purchases, or using any of our
                            services.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-400">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                                Last Updated: April 1, 2026
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                                Legally Binding Agreement
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="mx-auto max-w-6xl px-6 py-16 lg:px-12">
                <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
                    {/* Sidebar */}
                    <aside className="h-fit rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:sticky lg:top-8">
                        <h2 className="mb-5 text-lg font-bold text-white">
                            Contents
                        </h2>

                        <nav className="space-y-3">
                            {sections.map((section, index) => (
                                <a
                                    key={section.title}
                                    href={`#section-${index}`}
                                    className="block rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </nav>
                    </aside>

                    {/* Sections */}
                    <div className="space-y-8">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                            <h2 className="text-2xl font-bold text-white">
                                Overview
                            </h2>
                            <p className="mt-4 text-base leading-8 text-slate-300">
                                By continuing to use our platform, you
                                acknowledge that you have read, understood, and
                                agreed to these Terms and Conditions. These
                                rules exist to protect both our users and the
                                integrity of the platform.
                            </p>
                        </div>

                        {sections.map((section, index) => (
                            <div
                                key={section.title}
                                id={`section-${index}`}
                                className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-purple-400/30 hover:bg-white/[0.07]"
                            >
                                <div className="mb-5 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-lg font-bold text-white shadow-lg shadow-purple-500/20">
                                        {index + 1}
                                    </div>

                                    <h3 className="text-2xl font-bold text-white transition group-hover:text-purple-300">
                                        {section.title}
                                    </h3>
                                </div>

                                <p className="pl-16 text-base leading-8 text-slate-300">
                                    {section.content}
                                </p>
                            </div>
                        ))}

                        {/* Final Notice */}
                        <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-8 shadow-2xl shadow-purple-500/10">
                            <h3 className="text-2xl font-bold text-white">
                                Need Help?
                            </h3>
                            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                                If you have any questions regarding these Terms
                                and Conditions, please contact our support team
                                before using the platform.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-4">
                                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                                    support@shopwitholamide.com
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                                    Support Available Monday – Friday
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsComponent;
