// Features.tsx
import React from 'react';
import {
    FaArrowLeft,
    FaDolly,
    FaShippingFast,
} from 'react-icons/fa';
import FeatureUtils from '../utils/FeatureUtils';

const Features = () => {
    return (
        <section className="relative overflow-hidden bg-[#050816] py-24">
            {/* Background accents */}
            <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"></div>
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mb-14 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
                    <div className="max-w-xl">
                        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-gray-300 backdrop-blur-md">
                            Why Choose Us
                        </span>

                        <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">
                            Built Around Speed,
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Convenience & Trust
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-lg text-base leading-8 text-gray-400">
                        Every order is backed by reliable delivery, transparent
                        service and a shopping experience designed to make things
                        simple from start to finish.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <FeatureUtils
                        icon={<FaShippingFast />}
                        title="Fast Delivery"
                        paragraph="Get your orders delivered quickly with our streamlined shipping process and trusted delivery partners."
                    />

                    <FeatureUtils
                        icon={<FaDolly />}
                        title="Free Shipping"
                        paragraph="Enjoy free shipping on selected orders and products with no hidden costs at checkout."
                    />

                    <FeatureUtils
                        icon={<FaArrowLeft />}
                        title="Easy Returns"
                        paragraph="Changed your mind? Our return process is simple, straightforward and designed to be hassle-free."
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;