import React from 'react';


const ProductCardShowcase = ({ product }: any) => {
    return (
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 transition duration-500 group-hover:from-blue-500/10 group-hover:to-purple-500/10"></div>

            <div className="relative z-10">
                <div className="mb-4 overflow-hidden rounded-2xl bg-white/5 p-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-44 w-full object-contain transition duration-500 group-hover:scale-110"
                    />
                </div>

                <div className="space-y-3">
                    <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium tracking-wide text-blue-300 uppercase">
                        {product.category}
                    </span>

                    <h3 className="line-clamp-2 text-lg font-semibold leading-7 text-white">
                        {product.name}
                    </h3>

                    <p className="text-sm leading-6 text-gray-400">
                        Carefully selected for quality, performance and everyday
                        convenience.
                    </p>

                    {/* <button className="mt-2 flex items-center gap-2 text-sm font-semibold text-white transition group-hover:text-blue-300">
                        View Product
                        <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default ProductCardShowcase;