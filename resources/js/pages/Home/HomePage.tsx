import React from 'react'
import Navbar from '../components/NavbarHero'
import ProductShowcase from '../components/ProductShowcase'
import { usePage } from '@inertiajs/react';

const HomePage = () => {
  const { products } = usePage().props;
  console.log(products);
  return (
    <section>
        <Navbar />
        <ProductShowcase  products={products} />
    </section>
  )
}

export default HomePage