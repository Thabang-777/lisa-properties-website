'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">About Lisa Properties</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-300 max-w-3xl mx-auto">Redefining Real Estate with Purpose and Innovation</motion.p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/assets/images/PHOTO-2024-10-26-09-15-06.jpg" alt="Lisa Properties Office" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed">Founded in 2020, Lisa Properties (Pty) Ltd is a forward-thinking real estate company based in Johannesburg South, South Africa, specializing in property sales, rental placements, rental management, and property development across both residential and commercial sectors.</p>
            <p className="text-gray-700 text-lg leading-relaxed">At Lisa Properties, we are driven by a bold vision — to become the most renowned, profitable, and youth-driven global real estate brand. Our mission is built on innovation, diversity, and empowerment, reflecting our belief that young leaders are shaping the future of Africa's property industry.</p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: '🎯', title: 'Innovation', description: 'Leading with cutting-edge solutions and forward-thinking strategies in the real estate market.' },
            { icon: '🤝', title: 'Integrity', description: 'Building relationships rooted in honesty, transparency, and unwavering professionalism.' },
            { icon: '💪', title: 'Empowerment', description: "Supporting young leaders and creating opportunities across Africa's property industry." },
          ].map((value, index) => (
            <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-charcoal mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-12 rounded-2xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6 text-center">Our Commitment</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">Our team of qualified Property Practitioners go beyond facilitating transactions — we create exceptional real estate experiences. Whether you are a buyer, seller, landlord, or tenant, we are dedicated to building long-term relationships rooted in honesty, transparency, professionalism, compliance, integrity, and loyalty.</p>
          <p className="text-gray-700 text-lg leading-relaxed">As part of a broader ecosystem of innovation, Lisa Properties collaborates across industries and maintains a strategic partnership with its sister company, TMTR20, led by a dynamic young entrepreneur. Together, we are not just changing real estate — we are redefining what it means to lead with purpose in Africa's property market.</p>
        </motion.div>
      </div>
    </div>
  );
}
