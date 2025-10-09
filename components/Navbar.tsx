'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/listings', label: 'Listings' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Image src="/assets/logo-no-bg.webp" alt="Lisa Properties Logo" width={180} height={60} className="h-12 w-auto" priority />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-charcoal hover:text-gold transition-colors duration-300 font-medium">{link.label}</Link>
            ))}
            <button onClick={scrollToContact} className="bg-gold text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 hover:scale-105 font-medium">Contact Agent</button>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2" aria-label="Toggle menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-charcoal transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-charcoal transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-charcoal transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block py-2 text-charcoal hover:text-gold transition-colors duration-300 font-medium">{link.label}</Link>
              ))}
              <button onClick={scrollToContact} className="w-full bg-gold text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 font-medium">Contact Agent</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
