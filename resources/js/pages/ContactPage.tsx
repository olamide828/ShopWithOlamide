import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactComponent from './components/ContactComponent'
import { Head } from '@inertiajs/react'

const ContactPage = () => {
  return (
    <section>

        <Head title='Contact Us - ShopWithOlamide'></Head>

        <Navbar />
        <ContactComponent />
        <Footer />
    </section>
  )
}

export default ContactPage