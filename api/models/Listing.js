import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  // Source tracking
  source: {
    type: String,
    enum: ['property24', 'manual'],
    required: true,
  },
  property24Id: {
    type: String,
    unique: true,
    sparse: true, // Allow null for manual listings
  },
  property24Url: String,

  // Property details
  price: {
    type: String,
    required: true,
  },
  bedrooms: Number,
  bathrooms: Number,
  parkingSpaces: Number,
  erfSize: String,
  zoning: String,
  propertyType: {
    type: String,
    enum: ['House', 'Apartment', 'Townhouse', 'Land', 'Commercial', 'Other'],
    default: 'House',
  },
  abbreviated: String,
  fullDescription: String,
  location: String,

  // Media
  galleryImgs: [String],
  mainImage: String,

  // Status & Management
  status: {
    type: String,
    enum: ['available', 'on-show', 'sold', 'withdrawn', 'pending'],
    default: 'available',
  },
  statusUpdatedBy: String, // Admin email who changed status
  statusUpdatedAt: Date,

  // Dates
  listingDate: Date,
  soldDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastScrapedAt: Date,

  // Agent info
  agent: {
    type: String,
    default: 'Lisa Aphane',
  },
  agentId: {
    type: String,
    default: '560632',
  },

  // Tags
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

// Update updatedAt before saving
listingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Listing', listingSchema);
