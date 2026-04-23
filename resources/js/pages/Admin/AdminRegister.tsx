import React from 'react';
import Navbar from '../components/Navbar';
import AdminRegisterComponent from '../components/AdminRegisterComponent';
import { Head } from '@inertiajs/react';

const AdminRegister = () => {
    return (
        <section>
            <Head title="Admin Registration - ShopWithOlamide"></Head>

            <Navbar />
            <AdminRegisterComponent />
        </section>
    );
};

export default AdminRegister;
