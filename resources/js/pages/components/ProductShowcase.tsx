import { Link } from '@inertiajs/react';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const ProductShowcase = ({ products }: any) => {
    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            {/* Title */}
            <h2 className="mb-10 text-center text-3xl font-bold">
                Featured Products
            </h2>

            {/* TOP ROW (first 5) */}
            <div className="mb-8">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                    }}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    speed={3000}
                    loop={true}
                >
                    {products?.slice(0, 5).map((product: any) => (
                        <SwiperSlide key={product.id}>
                            <div className="rounded-xl border bg-white p-3 shadow-sm transition hover:shadow-md">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-28 w-full cursor-pointer rounded-md object-contain transition-all duration-150 ease-in-out hover:scale-105"
                                />

                                <div className="mt-2">
                                    <h3 className="truncate text-sm font-semibold">
                                        {product.name}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* CENTER BUTTON */}
            <div className="mb-8 flex justify-center">
                <Link href="/products" className='border-none outline-none'>
                    <button className="flex cursor-pointer items-center gap-3 rounded-full bg-linear-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90">
                        Explore Products
                        <FaArrowRight />
                    </button>
                </Link>
            </div>

            {/* BOTTOM ROW (next 5) */}
            <div>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                    }}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        reverseDirection: true,
                    }}
                    speed={3000}
                    loop={true}
                >
                    {products?.slice(5, 10).map((product: any) => (
                        <SwiperSlide key={product.id}>
                            <div className="rounded-xl border bg-white p-3 shadow-sm transition hover:shadow-md">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-28 w-full cursor-pointer rounded-md object-contain transition-all duration-150 ease-in-out hover:scale-105"
                                />

                                <div className="mt-2">
                                    <h3 className="truncate text-sm font-semibold">
                                        {product.name}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductShowcase;