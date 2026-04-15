import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactComponent from './components/ContactComponent'

const ContactPage = () => {
  return (
    <section>
        <Navbar />
        <ContactComponent />
        <Footer />
    </section>
  )
}

export default ContactPage