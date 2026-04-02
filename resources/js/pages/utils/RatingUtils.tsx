// RatingUtils.tsx
import React from 'react';

const RatingUtils = ({ rating, paragraph, rater, role }) => {
    return (
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]">
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 opacity-0 transition duration-500 group-hover:from-blue-500/10 group-hover:to-purple-500/10 group-hover:opacity-100"></div>

            <div className="relative z-10">
                <div className="mb-5">{rating}</div>

                <p className="text-base leading-8 text-gray-300">
                    “{paragraph}”
                </p>

                <div className="mt-8 flex items-center justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-white">
                            {rater}
                        </h4>
                        <p className="mt-1 text-sm text-gray-400">{role}</p>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                    

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-bold text-white">
                            {rater
                                ?.split(' ')
                                .map((name: any) => name.charAt(0))
                                .join('')
                                .toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingUtils;
