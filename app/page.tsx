'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { listings } from '@/data/listings';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const featuredListings = listings.slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you, we'll be in touch soon!");
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/assets/hero-1.webp" alt="Luxury Property" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-charcoal/50" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Your Home. Your Future.</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Redefining Real Estate with Purpose and Innovation</p>
          <button onClick={() => scrollTo('listings')} className="bg-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105">View Listings</button>
        </motion.div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">Welcome to Lisa Properties</h2>
            <p className="text-lg text-gray-700 leading-relaxed">Founded in 2020, we are a forward-thinking real estate company based in Johannesburg South, specializing in property sales, rental placements, rental management, and property development.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'Excellence', description: 'Delivering exceptional real estate experiences' },
              { icon: '💼', title: 'Professional', description: 'Qualified Property Practitioners you can trust' },
              { icon: '🌟', title: 'Innovation', description: "Leading with purpose in Africa's property market" },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="listings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">Featured Listings</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Discover your dream property in Johannesburg South</p>
            <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing, index) => (
              <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <PropertyCard listing={listing} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/listings" className="inline-block bg-charcoal text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold transition-all duration-300 hover:scale-105">View All Properties</Link>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">Contact Us</h2>
            <p className="text-gray-600 text-lg">Get in touch with our team</p>
            <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold text-charcoal mb-6">Get In Touch</h3>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start"><span className="mr-3 text-2xl">📍</span><span>Johannesburg South, South Africa</span></p>
                <p className="flex items-start"><span className="mr-3 text-2xl">📧</span><a href="mailto:info@lisaproperties.com" className="hover:text-gold transition-colors">info@lisaproperties.com</a></p>
                <p className="flex items-start"><span className="mr-3 text-2xl">📱</span><a href="tel:+27840127473" className="hover:text-gold transition-colors">+27 84 012 7473</a></p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                  <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
                </div>
                <button type="submit" className="w-full bg-gold text-white py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105">Send Message</button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
