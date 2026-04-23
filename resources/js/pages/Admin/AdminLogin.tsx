import React from 'react';
import Navbar from '../components/Navbar';
import AdminLoginComponent from '../components/AdminLoginComponent';
import { Head } from '@inertiajs/react';

const AdminLogin = () => {
    return (
        <section>
            <Head title="Administrator Login and management - ShopWithOlamide"></Head>

            <Navbar />
            <AdminLoginComponent />
        </section>
    );
};

export default AdminLogin;
