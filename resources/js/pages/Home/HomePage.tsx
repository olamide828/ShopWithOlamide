import React from 'react'
import Navbar from '../components/NavbarHero'
import ProductShowcase from '../components/ProductShowcase'
import { usePage } from '@inertiajs/react';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import Features from '../components/Features';

const HomePage = () => {
  const { products } = usePage().props;
  console.log(products);
  return (
    <section>
        <Navbar />
        <ProductShowcase  products={products} />
        <Features />
        <Rating />
        <Footer />
    </section>
  )
}

export default HomePage