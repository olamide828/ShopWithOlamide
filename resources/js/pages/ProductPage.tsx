import React from 'react';
import ProductPageData from './components/ProductPageData';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Rating from './components/Rating';
import { Head } from '@inertiajs/react';

const ProductPage = () => {

    return (
        <section>

          <Head title='Discover Premium Quality Products - ShopWithOlamide'></Head>

            <Navbar />
            <ProductPageData />
            <Footer />
        </section>
    );
};

export default ProductPage;

