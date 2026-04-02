// Rating.tsx
import React from 'react';
import { Rate } from 'antd';
import RatingUtils from '../utils/RatingUtils';

const Rating = () => {
    return (
        <section className="relative overflow-hidden bg-[#050816] py-24">
            {/* Background accents */}
            <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl"></div>

            <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:items-start lg:px-12">
                {/* Left Side */}
                <div className="lg:sticky lg:top-24 lg:w-[38%]">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-gray-300 backdrop-blur-md">
                        Customer Reviews
                    </span>

                    <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">
                        Loved by Shoppers
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Across Every Category
                        </span>
                    </h2>

                    <p className="mt-6 max-w-lg text-base leading-8 text-gray-400">
                        Thousands of customers trust ShopWithOlamide for quality
                        products, fast delivery and a smooth shopping experience.
                        Here’s what a few of them had to say.
                    </p>

                    <div className="mt-10 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-2xl font-bold text-white shadow-lg shadow-blue-500/20">
                            4.9
                        </div>

                        <div>
                            <Rate disabled defaultValue={5} className="[&_.ant-rate-star]:text-yellow-400" />
                            <p className="mt-1 text-sm text-gray-400">
                                Based on 2,000+ verified reviews
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 space-y-6">
                    <RatingUtils
                        rating={<Rate disabled defaultValue={5} className="[&_.ant-rate-star]:text-yellow-400" />}
                        paragraph="I ordered a wireless headset and a desk lamp, and both arrived earlier than expected. The quality was exactly as shown and the entire checkout process felt smooth and secure."
                        rater="Olatunde Adebesin"
                        role="Verified Buyer"
                    />

                    <RatingUtils
                        rating={<Rate disabled defaultValue={5} className="[&_.ant-rate-star]:text-yellow-400" />}
                        paragraph="What stood out to me was the customer service. I had a question about my order and got a response within minutes. It’s rare to find an online store this reliable."
                        rater="Ademola Toheeb"
                        role="Returning Customer"
                    />

                    <RatingUtils
                        rating={<Rate disabled defaultValue={5} className="[&_.ant-rate-star]:text-yellow-400" />}
                        paragraph="The product selection is excellent and everything feels premium. I’ve ordered multiple times already and every experience has been consistent from delivery to packaging."
                        rater="Amofe Emmanuel"
                        role="Frequent Shopper"
                    />
                </div>
            </div>
        </section>
    );
};

export default Rating;