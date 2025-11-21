'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you, we'll be in touch soon!");
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-300">We're here to help with all your real estate needs</motion.p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-charcoal mb-6">Get In Touch</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">Have questions about a property or our services? Our team is ready to assist you.</p>
            </div>
            {[
              { icon: '📍', title: 'Location', value: 'Johannesburg South, South Africa' },
              { icon: '📧', title: 'Email', value: 'info@lisaproperties.com', link: 'mailto:info@lisaproperties.com' },
              { icon: '📱', title: 'Phone', value: '+27 84 012 7473', link: 'tel:+27840127473' },
              { icon: '🌐', title: 'Website', value: 'www.lisaproperties.co.za', link: 'https://www.lisaproperties.co.za' },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">{item.title}</h3>
                  {item.link ? <a href={item.link} className="text-gold hover:text-charcoal transition-colors">{item.value}</a> : <p className="text-gray-600">{item.value}</p>}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-charcoal mb-6">Send Us a Message</h3>
              {[
                { id: 'name', label: 'Full Name', type: 'text', required: true },
                { id: 'email', label: 'Email Address', type: 'email', required: true },
                { id: 'phone', label: 'Phone Number', type: 'tel' },
              ].map(field => (
                <div key={field.id} className="mb-6">
                  <label htmlFor={field.id} className="block text-gray-700 font-medium mb-2">{field.label}</label>
                  <input type={field.type} id={field.id} value={formData[field.id as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })} required={field.required} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
                </div>
              ))}
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all" />
              </div>
              <button type="submit" className="w-full bg-gold text-white py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
