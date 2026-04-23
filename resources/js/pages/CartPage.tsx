import React from 'react';
import Navbar from './components/Navbar';
import Cart from './components/Carts';
import { Head } from '@inertiajs/react';

const CartPage = () => {
    return (
        <div>
            <Head title="Cart - ShopWithOlamide"></Head>

            <Navbar />
            <Cart />
        </div>
    );
};

export default CartPage;
