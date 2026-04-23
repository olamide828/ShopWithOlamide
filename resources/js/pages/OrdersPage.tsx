import React from 'react';
import OrdersComponent from './components/OrdersComponent';
import Navbar from './components/Navbar';
import { Head } from '@inertiajs/react';

const OrdersPage = () => {
    return (
        <section>
            <Head title="Order - ShopWithOlamide"></Head>

            <Navbar />
            <OrdersComponent />
        </section>
    );
};

export default OrdersPage;
