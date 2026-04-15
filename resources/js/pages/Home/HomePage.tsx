import React, { useEffect, useState } from 'react'
// import Navbar from '../components/NavbarHero'
import ProductShowcase from '../components/ProductShowcase'
import { usePage } from '@inertiajs/react';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import Features from '../components/Features';
import NavbarHero from '../components/NavbarHero';

const HomePage = () => {
  const { products } = usePage().props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if(loading) {
    return <div className="p-6 animate-pulse">Loading, Please wait...</div>
  }

  return (
    <section>
        <NavbarHero />
        <ProductShowcase  products={products} />
        <Features />
        <Rating />
        <Footer />
    </section>
  )
}

export default HomePage