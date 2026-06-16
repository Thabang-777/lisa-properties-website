import mongoose from 'mongoose';

const syncLogSchema = new mongoose.Schema({
  syncType: {
    type: String,
    enum: ['property24_scrape', 'manual_sync', 'csv_import'],
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'partial'],
    required: true,
  },
  message: String,
  error: String,
  
  // Statistics
  totalScraped: Number,
  newListings: Number,
  updatedListings: Number,
  removedListings: Number,
  
  startTime: Date,
  endTime: Date,
  duration: Number, // in seconds
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: String, // Admin email
});

export default mongoose.model('SyncLog', syncLogSchema);
