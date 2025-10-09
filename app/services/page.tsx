'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    { icon: '🏠', title: 'Property Sales', subtitle: 'Residential & Commercial', description: 'Expert guidance through every step of buying or selling property.' },
    { icon: '🔑', title: 'Rental Placements', subtitle: 'Tenant Screening', description: 'Comprehensive tenant screening and rental placement services.' },
    { icon: '🏢', title: 'Property Management', subtitle: 'Full-Service Management', description: 'Complete property management solutions for landlords.' },
    { icon: '🏗️', title: 'Property Development', subtitle: 'Development Projects', description: 'Strategic property development services from concept to completion.' },
    { icon: '💼', title: 'Real Estate Consulting', subtitle: 'Expert Advice', description: 'Professional real estate consulting for investors and property owners.' },
    { icon: '📊', title: 'Market Analysis', subtitle: 'Data-Driven Insights', description: 'Comprehensive market analysis and property valuations.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">Our Services</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-300 max-w-3xl mx-auto">Comprehensive real estate solutions tailored to your needs</motion.p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">{service.title}</h3>
              <p className="text-gold font-semibold mb-4">{service.subtitle}</p>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gold text-white p-12 rounded-2xl shadow-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Let our team of qualified Property Practitioners help you achieve your real estate goals.</p>
          <Link href="/contact" className="inline-block bg-white text-gold px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">Contact Us Today</Link>
        </motion.div>
      </div>
    </div>
  );
}
