import React from 'react';
import Navbar from './components/Navbar';
import WishlistComponent from './components/WishlistComponent';
import { Head } from '@inertiajs/react';

const WishlistPage = () => {
    return (
        <section>
            <Head title="Wishlist - ShopWithOlamide"></Head>

            <Navbar />
            <WishlistComponent />
        </section>
    );
};

export default WishlistPage;
