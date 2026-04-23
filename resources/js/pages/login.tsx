import React from 'react';
import Navbar from './components/Navbar';
import LoginComponent from './components/LoginComponent';
import { Head } from '@inertiajs/react';

const login = () => {
    return (
        <section>
            <Head title="Login - ShopWithOlamide"></Head>

            <Navbar />
            <LoginComponent />
        </section>
    );
};

export default login;
