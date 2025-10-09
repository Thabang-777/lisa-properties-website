export interface Listing {
  id: string;
  price: string;
  abbreviated: string;
  parkingSpaces: string;
  bathrooms: string;
  bedrooms: string;
  galleryImgs: string[];
  listingNumber: string;
  propertyType: string;
  listingDate: string;
  erfSize: string;
  zoning: string;
}

export const listings: Listing[] = [
  {
    id: '1',
    price: 'R 1,000,000',
    abbreviated: "Don't miss the chance to invest in this gem located in the heart of Soweto. Perfect for families or investors.",
    parkingSpaces: '1',
    bathrooms: '2',
    bedrooms: '3',
    galleryImgs: ['/assets/images/PHOTO-2024-10-26-10-20-07.jpg', '/assets/images/PHOTO-2024-10-26-10-20-08.jpg', '/assets/images/PHOTO-2024-10-26-10-20-09.jpg', '/assets/images/PHOTO-2024-10-26-10-20-10.jpg'],
    listingNumber: '116364280',
    propertyType: 'House',
    listingDate: '26 August 2025',
    erfSize: '382 m²',
    zoning: 'Single Residential'
  },
  {
    id: '2',
    price: 'R 1,900,000',
    abbreviated: 'This stunning family home is now available for sale! Perfectly located in Oakdene with space and comfort.',
    parkingSpaces: '2',
    bathrooms: '2',
    bedrooms: '4',
    galleryImgs: ['/assets/images/PHOTO-2024-10-26-10-20-11.jpg', '/assets/images/PHOTO-2024-10-26-10-20-12.jpg', '/assets/images/PHOTO-2024-10-26-10-20-13.jpg', '/assets/images/PHOTO-2024-10-26-10-20-14.jpg'],
    listingNumber: '115825689',
    propertyType: 'House',
    listingDate: '05 April 2025',
    erfSize: '992 m²',
    zoning: 'Residential'
  },
  {
    id: '3',
    price: 'R 850,000',
    abbreviated: 'Charming property in a well-established neighborhood. Ideal for first-time buyers or investors.',
    parkingSpaces: '1',
    bathrooms: '1',
    bedrooms: '2',
    galleryImgs: ['/assets/images/PHOTO-2024-10-26-10-20-15.jpg', '/assets/images/PHOTO-2024-10-26-10-20-16.jpg', '/assets/images/PHOTO-2024-10-26-10-20-17.jpg', '/assets/images/PHOTO-2024-10-26-10-20-18.jpg'],
    listingNumber: '116425891',
    propertyType: 'House',
    listingDate: '12 September 2025',
    erfSize: '325 m²',
    zoning: 'Single Residential'
  },
  {
    id: '4',
    price: 'R 2,500,000',
    abbreviated: 'Luxurious family home with modern finishes throughout. Features spacious living areas and beautiful garden space.',
    parkingSpaces: '3',
    bathrooms: '3',
    bedrooms: '5',
    galleryImgs: ['/assets/images/PHOTO-2024-10-26-10-20-19.jpg', '/assets/images/PHOTO-2024-10-26-10-20-20.jpg', '/assets/images/PHOTO-2024-10-26-10-20-21.jpg', '/assets/images/PHOTO-2024-10-26-10-20-22.jpg'],
    listingNumber: '115963247',
    propertyType: 'House',
    listingDate: '18 June 2025',
    erfSize: '1250 m²',
    zoning: 'Residential'
  },
  {
    id: '5',
    price: 'R 1,350,000',
    abbreviated: 'Well-maintained property in a sought-after area. Perfect for families seeking comfort and convenience.',
    parkingSpaces: '2',
    bathrooms: '2',
    bedrooms: '3',
    galleryImgs: ['/assets/images/PHOTO-2024-10-26-10-20-23.jpg', '/assets/images/PHOTO-2024-10-26-10-20-24.jpg', '/assets/images/PHOTO-2024-10-26-10-20-25.jpg', '/assets/images/PHOTO-2024-10-26-10-20-26.jpg'],
    listingNumber: '116218534',
    propertyType: 'House',
    listingDate: '22 July 2025',
    erfSize: '520 m²',
    zoning: 'Single Residential'
  },
  {
    id: '6',
    price: 'R 1,650,000',
    abbreviated: 'Beautiful contemporary home with excellent security features. Spacious entertainment areas ideal for family living.',
    parkingSpaces: '2',
    bathrooms: '2',
    bedrooms: '4',
    galleryImgs: ['/assets/images/PHOTO-2024-10-26-10-20-27.jpg', '/assets/images/PHOTO-2024-10-26-10-20-28.jpg', '/assets/images/PHOTO-2024-10-26-10-20-30.jpg', '/assets/images/PHOTO-2024-10-26-10-20-31.jpg'],
    listingNumber: '116089745',
    propertyType: 'House',
    listingDate: '30 May 2025',
    erfSize: '680 m²',
    zoning: 'Residential'
  }
];
