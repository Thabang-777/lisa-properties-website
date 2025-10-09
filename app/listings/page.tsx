'use client';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import { listings } from '@/data/listings';
import { useState } from 'react';

export default function ListingsPage() {
  const [sortBy, setSortBy] = useState('date');
  const [filterBedrooms, setFilterBedrooms] = useState('all');

  let filteredListings = [...listings];
  if (filterBedrooms !== 'all') filteredListings = filteredListings.filter((l) => l.bedrooms === filterBedrooms);
  if (sortBy === 'price-asc') filteredListings.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
  else if (sortBy === 'price-desc') filteredListings.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-charcoal text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">Property Listings</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-300">Browse our selection of properties in Johannesburg South</motion.p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <label htmlFor="bedrooms" className="text-gray-700 font-medium">Bedrooms:</label>
            <select id="bedrooms" value={filterBedrooms} onChange={(e) => setFilterBedrooms(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold">
              <option value="all">All</option>
              {['2', '3', '4', '5'].map(num => <option key={num} value={num}>{num} Bedrooms</option>)}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="sort" className="text-gray-700 font-medium">Sort by:</label>
            <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold">
              <option value="date">Date Listed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((listing, index) => (
            <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <PropertyCard listing={listing} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
