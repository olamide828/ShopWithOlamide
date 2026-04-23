import React from 'react';
import Navbar from './components/Navbar';
import TermsComponent from './components/TermsComponent';
import Footer from './components/Footer';
import { Head } from '@inertiajs/react';

const Terms = () => {
    return (
        <section>
            <Head title="Terms - ShopWithOlamide"></Head>

            <Navbar />
            <TermsComponent />
            <Footer />
        </section>
    );
};

export default Terms;
