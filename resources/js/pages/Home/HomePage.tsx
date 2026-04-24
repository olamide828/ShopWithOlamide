import React, { useEffect, useState } from 'react';
// import Navbar from '../components/NavbarHero'
import ProductShowcase from '../components/ProductShowcase';
import { Head, usePage } from '@inertiajs/react';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import Features from '../components/Features';
import NavbarHero from '../components/NavbarHero';
import { toast } from 'sonner';

const HomePage = () => {
    const { products } = usePage().props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        const isSafari = () => {
            const ua = navigator.userAgent;
            const isChrome = ua.includes('Chrome') || ua.includes('CriOS');
            const isSafari = ua.includes('Safari');
            return isSafari && !isChrome;
        };

        const safariWarningDismissed = localStorage.getItem(
            'safariWarningDismissed',
        );

        if (isSafari() && !safariWarningDismissed) {
            toast('Heads up, Safari User!', {
                description:
                    'For the best experience, we recommend Chrome or Firefox. Some features may look different on Safari.',
                duration: 60000,
                id: 'safari-warning',
                action: {
                    label: 'Got it',
                    onClick: () => {
                        localStorage.setItem('safariWarningDismissed', 'true');
                    },
                },
                cancel: {
                    label: 'Dismiss',
                    onClick: () => {
                        localStorage.setItem('safariWarningDismissed', 'true');
                    },
                },
            });
        }
    }, []);
    if (loading) {
        return (
            <>
                <Head title="ShopWithOlamide"></Head>{' '}
                <div className="animate-pulse p-6">Loading, Please wait...</div>
            </>
        );
    }

    return (
        <section>
            <Head title="ShopWithOlamide"></Head>
            <NavbarHero />
            <ProductShowcase products={products} />
            <Features />
            <Rating />
            <Footer />
            {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque eum
            doloremque, exercitationem doloribus esse sunt? Labore dolorum odit
            blanditiis ab ut alias, modi cum aut minima eligendi, cupiditate,
            facilis perferendis. Vel, nesciunt! Tempora pariatur at aliquid,
            doloremque ipsam, laudantium dignissimos quia eum repudiandae
            sapiente corrupti fugit ex perspiciatis ratione laboriosam. */}
        </section>
    );
};

export default HomePage;
