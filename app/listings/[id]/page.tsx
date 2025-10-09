'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, use } from 'react';
import { listings } from '@/data/listings';
import { notFound } from 'next/navigation';

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const listing = listings.find((l) => l.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!listing) notFound();

  const nextImage = () => setCurrentImageIndex((prev) => prev === listing.galleryImgs.length - 1 ? 0 : prev + 1);
  const prevImage = () => setCurrentImageIndex((prev) => prev === 0 ? listing.galleryImgs.length - 1 : prev - 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/listings" className="inline-flex items-center text-gold hover:text-charcoal transition-colors mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Listings
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl mb-4">
              <Image src={listing.galleryImgs[currentImageIndex]} alt={`Property image ${currentImageIndex + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              {listing.galleryImgs.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-3 rounded-full transition-all hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal p-3 rounded-full transition-all hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-charcoal/80 text-white px-4 py-2 rounded-full text-sm">{currentImageIndex + 1} / {listing.galleryImgs.length}</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {listing.galleryImgs.map((img, index) => (
                <button key={index} onClick={() => setCurrentImageIndex(index)} className={`relative h-20 rounded-lg overflow-hidden ${index === currentImageIndex ? 'ring-4 ring-gold' : 'opacity-60 hover:opacity-100'} transition-all`}>
                  <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" sizes="150px" />
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 font-medium">{listing.propertyType}</span>
                <span className="text-sm text-gray-500">Listing #{listing.listingNumber}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">{listing.price}</h1>
              <p className="text-gray-700 text-lg leading-relaxed">{listing.abbreviated}</p>
            </div>
            <div className="border-t border-b border-gray-200 py-6">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Bedrooms', value: `🛏️ ${listing.bedrooms}` },
                  { label: 'Bathrooms', value: `🚿 ${listing.bathrooms}` },
                  { label: 'Parking', value: `🚗 ${listing.parkingSpaces}` },
                  { label: 'Erf Size', value: listing.erfSize },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-gray-600 text-sm mb-1">{item.label}</p>
                    <p className="text-2xl font-bold text-charcoal">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-charcoal mb-4">Property Details</h3>
              <div className="space-y-3 text-gray-700">
                {[
                  { label: 'Zoning', value: listing.zoning },
                  { label: 'Property Type', value: listing.propertyType },
                  { label: 'Listed Date', value: listing.listingDate },
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="font-medium">{item.label}:</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Link href="/contact" className="block w-full text-center bg-gold text-white py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105">Contact Agent</Link>
              <a href="tel:+27840127473" className="block w-full text-center bg-charcoal text-white py-4 rounded-full text-lg font-semibold hover:bg-gold transition-all duration-300">Call +27 84 012 7473</a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
