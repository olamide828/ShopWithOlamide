// FeatureUtils.tsx
import React from 'react';

const FeatureUtils = ({ title, paragraph, icon }) => {
    const GradientLogo = () => (
        <span
            className="mb-6 flex h-14 w-1"
            style={{
                display: 'inline-block',
                background:
                    'linear-gradient(to right, #3b82f6, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                fontSize: '1.25rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
            }}
        >
            {icon}
        </span>
    );

    return (
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]">
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 transition duration-500 group-hover:from-blue-500/10 group-hover:to-purple-500/10 group-hover:opacity-100"></div>

            <div className="relative z-10">

                <div>
                    <GradientLogo />
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-white">
                    {title}
                </h3>

                <p className="max-w-sm text-sm leading-7 text-gray-400">
                    {paragraph}
                </p>
            </div>
        </div>
    );
};

export default FeatureUtils;
