import React from 'react';
import Navbar from './components/Navbar';
import AboutComponent from './components/AboutComponent';
import Footer from './components/Footer';
import { Head } from '@inertiajs/react';

const About = () => {
    return (
        <section>
            <Head title="About Us - ShopWithOlamide"></Head>

            <Navbar />
            <AboutComponent />
            <Footer />
        </section>
    );
};

export default About;
