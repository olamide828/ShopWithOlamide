import { Link } from '@inertiajs/react';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import wireless_noise_canceling_headphones from '/public/wireless-noise-canceling-headphones.jpg';
import stainless_steel_water_bottle from '/public/stainless-steel-water-bottle.jpg';
import smart_led_desk_lamp from '/public/smart-led-desk-lamp.jpg';
import smart_fitness_tracker from '/public/smart-fitness-tracker.jpg';
import portable_power_bank_20000mah from '/public/portable-power-bank-20000mah.jpg';
import mechanical_gaming_keyboard from '/public/mechanical-gaming-keyboard.jpg';
import leather_laptop_sleeve from '/public/leather-laptop-sleeve.jpg';
import ergonomic_office_chair from '/public/ergonomic-office-chair.jpg';
import bluetooth_mesh_speaker from '/public/bluetooth-mesh-speaker.jpg';
import _4k_ultra_hd_projector from '/public/4k-ultra-hd-projector.jpg';
import ProductCardShowcase from '../ProductCardShowcase';

const products = [
    {
        image: wireless_noise_canceling_headphones,
        name: 'Wireless Noise Cancelling Headphones',
        category: 'Audio',
    },
    {
        image: stainless_steel_water_bottle,
        name: 'Stainless Steel Water Bottle',
        category: 'Lifestyle',
    },
    {
        image: smart_led_desk_lamp,
        name: 'Smart LED Desk Lamp',
        category: 'Home',
    },
    {
        image: smart_fitness_tracker,
        name: 'Smart Fitness Tracker',
        category: 'Fitness',
    },
    {
        image: portable_power_bank_20000mah,
        name: 'Portable Power Bank 20000mAh',
        category: 'Tech',
    },
    {
        image: mechanical_gaming_keyboard,
        name: 'Mechanical Gaming Keyboard',
        category: 'Gaming',
    },
    {
        image: leather_laptop_sleeve,
        name: 'Leather Laptop Sleeve',
        category: 'Accessories',
    },
    {
        image: ergonomic_office_chair,
        name: 'Ergonomic Office Chair',
        category: 'Workspace',
    },
    {
        image: bluetooth_mesh_speaker,
        name: 'Bluetooth Mesh Speaker',
        category: 'Audio',
    },
    {
        image: _4k_ultra_hd_projector,
        name: '4K Ultra HD Projector',
        category: 'Entertainment',
    },
];


const GradientText = () => (
    <span
        style={{
            display: 'inline-block',
            background: 'linear-gradient(to right, #3b82f6, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
        }}
    >
       Modern Living
    </span>
);


const ProductShowcase = () => {
    return (
        <section className="relative overflow-hidden bg-[#050816] py-24">
            {/* Background Glow */}
            <div className="absolute top-20 left-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"></div>
            <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
                {/* Heading */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium tracking-[0.25em] text-gray-300 uppercase backdrop-blur-md">
                        Featured Collection
                    </span>

                    <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                        Explore Products Built For
                        <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            <GradientText />
                        </span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                        Discover premium essentials, smart technology and lifestyle
                        products curated to match the same modern experience behind
                        ShopWithOlamide.
                    </p>
                </div>

                {/* Top Slider */}
                <div className="mb-8">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        speed={5000}
                        loop
                    >
                        {products.slice(0, 5).map((product, index) => (
                            <SwiperSlide key={index}>
                                <ProductCardShowcase product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Bottom Slider */}
                <div className="mb-14">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            reverseDirection: true,
                        }}
                        speed={5000}
                        loop
                    >
                        {products.slice(5, 10).map((product, index) => (
                            <SwiperSlide key={index}>
                                <ProductCardShowcase product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center justify-center text-center">
                    <p className="mb-6 max-w-xl text-base leading-7 text-gray-400">
                        Browse our full collection and find products designed to
                        elevate your lifestyle, workspace and everyday routine.
                    </p>

                    <Link href="/shop/u/products">
                        <button className="group flex cursor-pointer items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-[0_15px_40px_rgba(99,102,241,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(99,102,241,0.5)]">
                            Explore All Products
                            <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default ProductShowcase;