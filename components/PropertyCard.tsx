'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Listing } from '@/data/listings';

export default function PropertyCard({ listing }: { listing: Listing }) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image src={listing.galleryImgs[0]} alt={`Property in ${listing.zoning}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute top-4 right-4 bg-gold text-white px-4 py-2 rounded-full font-bold">{listing.price}</div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600 font-medium">{listing.propertyType}</span>
          <span className="text-xs text-gray-500">{listing.erfSize}</span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-2">{listing.abbreviated}</p>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <div className="flex items-center space-x-4">
            <span>🛏️ {listing.bedrooms}</span>
            <span>🚿 {listing.bathrooms}</span>
            <span>🚗 {listing.parkingSpaces}</span>
          </div>
        </div>
        <Link href={`/listings/${listing.id}`} className="block w-full text-center bg-charcoal text-white py-3 rounded-full hover:bg-gold transition-all duration-300 font-medium">View Details</Link>
      </div>
    </motion.div>
  );
}
