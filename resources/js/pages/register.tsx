import React from 'react';
import Navbar from './components/Navbar';
import RegisterComponent from './components/RegisterComponent';
import { Head } from '@inertiajs/react';

const register = () => {
    return (
        <section>
            <Head title="Register and Shop With the Best Retail Store Today! - ShopWithOlamide"></Head>

            <Navbar />
            <RegisterComponent />
        </section>
    );
};

export default register;
