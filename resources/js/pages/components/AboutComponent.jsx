import React from 'react';
import FounderImg from "/public/founderImg.jpeg";

const AboutComponent = () => {
    return (
        <main className="bg-white text-slate-800">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 px-6 py-24 text-white lg:px-16">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-500 blur-3xl" />
                    <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-cyan-400 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-6xl">
                    <div className="max-w-4xl">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200 backdrop-blur-md">
                            About Our Company
                        </span>

                        <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl lg:text-7xl">
                            We are building a smarter, safer, and more trusted way for people to shop online.
                        </h1>

                        <p className="mt-8 max-w-3xl text-lg leading-9 text-slate-200 md:text-xl">
                            Our platform was created with a simple mission: make it easier for people to discover quality products, connect with trusted sellers, and shop with confidence. What began as an idea has grown into a thriving marketplace built around transparency, reliability, and a better experience for everyone.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="px-6 py-24 lg:px-16">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900">
                                Our Journey
                            </h2>

                            <p className="mt-6 text-lg leading-9 text-slate-600">
                                We launched this platform because we saw a problem in the online shopping experience. Too many platforms were difficult to use, filled with low-quality listings, and lacked the trust that customers deserve. Buyers struggled to know who to trust, while honest sellers found it difficult to stand out.
                            </p>

                            <p className="mt-6 text-lg leading-9 text-slate-600">
                                Instead of creating another marketplace, we focused on building something different. We wanted a place where products are presented clearly, sellers can grow their businesses, and customers can make informed decisions without confusion or uncertainty.
                            </p>

                            <p className="mt-6 text-lg leading-9 text-slate-600">
                                Since our launch, we have continued to improve every part of the platform — from the shopping experience and product discovery to security, support, and performance. Every update is guided by one goal: making the experience better for the people who use it every day.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-slate-50 p-8 shadow-xl ring-1 ring-slate-200">
                            <h3 className="text-2xl font-bold text-slate-900">
                                What We Stand For
                            </h3>

                            <div className="mt-8 space-y-6">
                                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <h4 className="text-lg font-bold text-slate-900">Trust & Transparency</h4>
                                    <p className="mt-2 leading-7 text-slate-600">
                                        We believe every customer should feel confident before making a purchase. That is why we focus on clear product information, verified sellers, and honest communication.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <h4 className="text-lg font-bold text-slate-900">Innovation</h4>
                                    <p className="mt-2 leading-7 text-slate-600">
                                        We are constantly improving our platform to make it faster, easier, and more enjoyable to use. We listen closely to our users and build features that solve real problems.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <h4 className="text-lg font-bold text-slate-900">Customer First</h4>
                                    <p className="mt-2 leading-7 text-slate-600">
                                        Every decision we make is centered around our users. Whether you are a customer or a seller, our goal is to give you the best experience possible.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Section */}
            <section className="bg-slate-900 px-6 py-24 text-white lg:px-16">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-black md:text-5xl">
                            The Success of Our Product
                        </h2>

                        <p className="mt-6 text-lg leading-9 text-slate-300">
                            Over time, our product has grown from a simple idea into a platform trusted by thousands of users. What makes us successful is not just the number of people using the platform, but the relationships and trust we have built along the way.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                            <h3 className="text-5xl font-black text-white">10K+</h3>
                            <p className="mt-3 text-slate-300">
                                Customers who have used and trusted our platform.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                            <h3 className="text-5xl font-black text-white">500+</h3>
                            <p className="mt-3 text-slate-300">
                                Carefully selected products available across multiple categories.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                            <h3 className="text-5xl font-black text-white">99%</h3>
                            <p className="mt-3 text-slate-300">
                                Positive customer satisfaction rate driven by quality service.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                            <h3 className="text-5xl font-black text-white">24/7</h3>
                            <p className="mt-3 text-slate-300">
                                Support available to help users anytime they need assistance.
                            </p>
                        </div>
                    </div>

                    <div className="mt-14 grid gap-10 lg:grid-cols-2">
                        <div>
                            <p className="text-lg leading-9 text-slate-300">
                                Our growth has been fueled by strong customer loyalty and positive feedback. Many of our users return again and again because they know they can trust the experience. Sellers also continue to join because they see real value in being part of a platform that helps them succeed.
                            </p>
                        </div>

                        <div>
                            <p className="text-lg leading-9 text-slate-300">
                                Today, we are proud of how far we have come, but we believe we are only getting started. We continue to invest in new features, improved security, and better tools so that our platform can grow while staying true to the values that made it successful.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="px-6 py-24 lg:px-16">
                <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[420px_1fr] lg:items-center">
                    <div>
                        <img
                            src={FounderImg}
                            alt="Founder and CEO"
                            className="h-[540px] w-full rounded-3xl object-cover object-top shadow-2xl"
                        />
                    </div>

                    <div>
                        <span className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
                            Meet The Founder & CEO
                        </span>

                        <h2 className="mt-5 text-4xl font-black text-slate-900 md:text-5xl">
                            A Vision Built On Passion And Purpose
                        </h2>

                        <p className="mt-6 text-lg leading-9 text-slate-600">
                            Our founder & CEO, Dr. Adegboyega Olamide, started this company with a clear vision: create a platform that people can trust and genuinely enjoy using. From the beginning, the focus was not only on building technology, but also on building meaningful experiences for customers and businesses.
                        </p>

                        <p className="mt-6 text-lg leading-9 text-slate-600">
                            Through determination, innovation, and a commitment to excellence, that vision became reality. What began as a small idea has evolved into a growing product used by thousands of people.
                        </p>

                        <p className="mt-6 text-lg leading-9 text-slate-600">
                            Even as the company continues to grow, the mission remains the same: put users first, keep improving, and never stop building something better.
                        </p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900">Leadership</h3>
                                <p className="mt-2 leading-7 text-slate-600">
                                    Creating a strong customer-first culture across the company.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900">Long-Term Vision</h3>
                                <p className="mt-2 leading-7 text-slate-600">
                                    Building a platform that continues to grow and shape the future of online shopping.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutComponent;
