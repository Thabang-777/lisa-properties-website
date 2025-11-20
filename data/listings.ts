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
    galleryImgs: ['https://images.prop24.com/363784237/Crop320x213', 'https://images.prop24.com/363784238/Crop320x213', 'https://images.prop24.com/363784239/Crop320x213', 'https://images.prop24.com/363784240/Crop320x213', 'https://images.prop24.com/363784241/Crop320x213', 'https://images.prop24.com/363784242/Crop320x213', 'https://images.prop24.com/363784243/Crop320x213', 'https://images.prop24.com/363784244/Crop320x213', 'https://images.prop24.com/363784244/Crop320x213', 'https://images.prop24.com/363784245/Crop320x213', 'https://images.prop24.com/363784246/Crop320x213', 'https://images.prop24.com/363784247/Crop320x213', 'https://images.prop24.com/363784248/Crop320x213', 'https://images.prop24.com/363784249/Crop320x213', 'https://images.prop24.com/363784250/Crop320x213', 'https://images.prop24.com/363784250/Crop320x213','https://images.prop24.com/363784251/Crop320x213', 'https://images.prop24.com/363784252/Crop320x213', 'https://images.prop24.com/363784253/Crop320x213', 'https://images.prop24.com/363784254/Crop320x213', 'https://images.prop24.com/363784255/Crop320x213', 'https://images.prop24.com/363784256/Crop320x213', 'https://images.prop24.com/363784257/Crop320x213', 'https://images.prop24.com/363784258/Crop320x213', 'https://images.prop24.com/363784259/Crop320x213', 'https://images.prop24.com/363784260/Crop320x213'],
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
    galleryImgs: ['https://images.prop24.com/359724521/Crop320x213', 'https://images.prop24.com/359724520/Crop320x213', 'https://images.prop24.com/359684218/Crop320x213', 'https://images.prop24.com/354830826/Crop320x213', 'https://images.prop24.com/354830826/Crop320x213', 'https://images.prop24.com/354830851/Crop320x213', 'https://images.prop24.com/354830851/Crop320x213', 'https://images.prop24.com/354830854/Crop320x213', 'https://images.prop24.com/359684219/Crop320x213', 'https://images.prop24.com/359684220/Crop320x213', 'https://images.prop24.com/359684221/Crop320x213', 'https://images.prop24.com/359684222/Crop320x213', 'https://images.prop24.com/354830829/Crop320x213', 'https://images.prop24.com/359684223/Crop320x213', 'https://images.prop24.com/354830834/Crop320x213', 'https://images.prop24.com/359684224/Crop320x213', 'https://images.prop24.com/354830856/Crop320x213', 'https://images.prop24.com/359684225/Crop320x213', 'https://images.prop24.com/354830866/Crop320x213', 'https://images.prop24.com/354830858/Crop320x213', 'https://images.prop24.com/359684226/Crop320x213', 'https://images.prop24.com/359684227/Crop320x213', 'https://images.prop24.com/359684228/Crop320x213', 'https://images.prop24.com/359684229/Crop320x213', 'https://images.prop24.com/359684230/Crop320x213', 'https://images.prop24.com/359684230/Crop320x213', 'https://images.prop24.com/359684231/Crop320x213', 'https://images.prop24.com/359684232/Crop320x213', 'https://images.prop24.com/359684233/Crop320x213', 'https://images.prop24.com/354830875/Crop320x213', 'https://images.prop24.com/359684234/Crop320x213', 'https://images.prop24.com/359684235/Crop320x213', 'https://images.prop24.com/354830877/Crop320x213'],
    listingNumber: '115825689',
    propertyType: 'House',
    listingDate: '05 April 2025',
    erfSize: '992 m²',
    zoning: 'Residential'
  },
];
