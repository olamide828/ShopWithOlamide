import React, { useEffect, useState } from 'react';
// import Navbar from '../components/NavbarHero'
import ProductShowcase from '../components/ProductShowcase';
import { Head, usePage } from '@inertiajs/react';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import Features from '../components/Features';
import NavbarHero from '../components/NavbarHero';
import useOnline from '../components/useOnline';

const HomePage = () => {
    const { products } = usePage().props;
    const [loading, setLoading] = useState(true);
    const isOnline = useOnline();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return (
            <>
                <Head title="ShopWithOlamide"></Head>{' '}
                <div className="animate-pulse p-6">Loading, Please wait...</div>
            </>
        );
    }

  // const handleRefresh = () => {
  //   window.location.reload();
  // };

  // if (isOnline) {
  //   return (
  //     <div className="flex flex-col selection:bg-green-400 selection:text-white h-screen justify-center items-center bg-green-500 gap-4">
  //       <h1 className="text-2xl font-[poppins]">
  //         Oops! No internet connection
  //       </h1>
  //       <p className="text-xl font-[poppins]">
  //         Please check your connection and try again.
  //       </p>
  //       {/* <img src={internetError} alt="internet error" title="Internet Error" /> */}
  //       <button
  //         title="Refresh"
  //         onClick={handleRefresh}
  //         className="bg-black cursor-pointer hover:bg-black/25 text-white font-[poppins] p-6 rounded-2xl text-2xl"
  //       >
  //         Refresh
  //       </button>

  //       <p className="font-[inter] mt-40">
  //         &copy;2018-{new Date().getFullYear()}. ShopWithOlamide. All Rights Reserved.
  //       </p>
  //     </div>
  //   );
  // }

    return (
        <section>
            <Head title="ShopWithOlamide"></Head>
            <NavbarHero />
            <ProductShowcase products={products} />
            <Features />
            <Rating />
            <Footer />
            {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque eum
            doloremque, exercitationem doloribus esse sunt? Labore dolorum odit
            blanditiis ab ut alias, modi cum aut minima eligendi, cupiditate,
            facilis perferendis. Vel, nesciunt! Tempora pariatur at aliquid,
            doloremque ipsam, laudantium dignissimos quia eum repudiandae
            sapiente corrupti fugit ex perspiciatis ratione laboriosam. */}
        </section>
    );
};

export default HomePage;
