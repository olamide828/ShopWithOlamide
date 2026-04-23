import React from 'react';
import Navbar from './components/Navbar';
import PrivacyPolicyComponent from './components/PrivacyPolicyComponent';
import Footer from './components/Footer';
import { Head } from '@inertiajs/react';

const PrivacyPolicy = () => {
    return (
        <section>
            <Head title="Privacy Policy - ShopWithOlamide"></Head>

            <Navbar />
            <PrivacyPolicyComponent />
            <Footer />
        </section>
    );
};

export default PrivacyPolicy;
