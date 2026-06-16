import { parse } from 'csv-parse/sync';
import Listing from '../models/Listing.js';
import SyncLog from '../models/SyncLog.js';

export const importListingsFromCSV = async (csvContent, createdBy = 'system') => {
  const startTime = new Date();
  const syncLog = {
    syncType: 'csv_import',
    status: 'success',
    startTime,
    createdBy,
    newListings: 0,
    updatedListings: 0,
  };

  try {
    // Parse CSV
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    syncLog.totalScraped = records.length;

    for (const record of records) {
      const {
        price,
        bedrooms,
        bathrooms,
        parkingSpaces,
        erfSize,
        zoning,
        propertyType,
        abbreviated,
        fullDescription,
        location,
        mainImage,
        status,
      } = record;

      const listingData = {
        source: 'manual',
        price,
        bedrooms: parseInt(bedrooms) || 0,
        bathrooms: parseInt(bathrooms) || 0,
        parkingSpaces: parseInt(parkingSpaces) || 0,
        erfSize,
        zoning,
        propertyType: propertyType || 'House',
        abbreviated,
        fullDescription,
        location,
        mainImage,
        galleryImgs: mainImage ? [mainImage] : [],
        status: status || 'available',
        listingDate: new Date(),
        agent: 'Lisa Aphane',
        agentId: process.env.PROPERTY24_AGENT_ID,
      };

      // Create or update based on unique identifier (if provided)
      const created = await Listing.create(listingData);
      syncLog.newListings++;
    }

    syncLog.endTime = new Date();
    syncLog.duration = Math.round((syncLog.endTime - startTime) / 1000);

    await SyncLog.create(syncLog);
    console.log(`✅ CSV Import complete! Imported ${syncLog.newListings} listings`);

    return syncLog;
  } catch (error) {
    syncLog.status = 'failed';
    syncLog.error = error.message;
    syncLog.endTime = new Date();
    syncLog.duration = Math.round((syncLog.endTime - startTime) / 1000);

    await SyncLog.create(syncLog);
    console.error('❌ CSV Import failed:', error.message);
    throw error;
  }
};

export const generateCSVTemplate = () => {
  const headers = [
    'price',
    'bedrooms',
    'bathrooms',
    'parkingSpaces',
    'erfSize',
    'zoning',
    'propertyType',
    'abbreviated',
    'fullDescription',
    'location',
    'mainImage',
    'status',
  ];

  return headers.join(',') + '\n';
};
