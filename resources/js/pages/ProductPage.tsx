import React from 'react'
import ProductPageData from './components/ProductPageData'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Rating from './components/Rating';

const ProductPage = () => {
  return (
    <section>
        <Navbar />
        <ProductPageData />
        <Footer />
    </section>
  )
}

export default ProductPage;