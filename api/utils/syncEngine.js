import Listing from '../models/Listing.js';
import SyncLog from '../models/SyncLog.js';
import { getProperty24PageCount, scrapeProperty24 } from '../scrapers/property24Scraper.js';

export const syncProperty24Listings = async (createdBy = 'system') => {
  const startTime = new Date();
  let syncLog = {
    syncType: 'property24_scrape',
    status: 'success',
    startTime,
    createdBy,
    totalScraped: 0,
    newListings: 0,
    updatedListings: 0,
    removedListings: 0,
  };

  try {
    console.log('🚀 Starting Property24 sync...');

    // Get total pages
    const pageCount = await getProperty24PageCount(process.env.PROPERTY24_AGENT_ID);
    console.log(`📄 Found ${pageCount} page(s)`);

    const scrapedIds = new Set();
    let allScrapedListings = [];

    // Scrape all pages
    for (let page = 1; page <= pageCount; page++) {
      try {
        const listings = await scrapeProperty24(process.env.PROPERTY24_AGENT_ID, page);
        allScrapedListings = [...allScrapedListings, ...listings];
        syncLog.totalScraped += listings.length;
      } catch (error) {
        console.error(`Error scraping page ${page}:`, error.message);
      }
    }

    // Process each scraped listing
    for (const scraped of allScrapedListings) {
      scrapedIds.add(scraped.property24Id);

      const existing = await Listing.findOne({ property24Id: scraped.property24Id });

      if (existing) {
        // Update existing listing
        await Listing.updateOne(
          { property24Id: scraped.property24Id },
          {
            price: scraped.price,
            abbreviated: scraped.abbreviated,
            mainImage: scraped.mainImage,
            bedrooms: scraped.bedrooms,
            bathrooms: scraped.bathrooms,
            parkingSpaces: scraped.parkingSpaces,
            location: scraped.location,
            lastScrapedAt: new Date(),
            // Don't override status if already manually changed
            status: existing.status === 'sold' ? 'sold' : 'available',
          }
        );
        syncLog.updatedListings++;
      } else {
        // Create new listing
        await Listing.create({
          source: 'property24',
          property24Id: scraped.property24Id,
          property24Url: scraped.property24Url,
          price: scraped.price,
          bedrooms: scraped.bedrooms,
          bathrooms: scraped.bathrooms,
          parkingSpaces: scraped.parkingSpaces,
          abbreviated: scraped.abbreviated,
          mainImage: scraped.mainImage,
          galleryImgs: [scraped.mainImage],
          location: scraped.location,
          status: 'available',
          listingDate: new Date(),
          lastScrapedAt: new Date(),
          agent: 'Lisa Aphane',
          agentId: process.env.PROPERTY24_AGENT_ID,
        });
        syncLog.newListings++;
      }
    }

    // Mark listings as sold if they no longer appear on Property24
    const existingListings = await Listing.find({ source: 'property24', status: { $ne: 'sold' } });

    for (const listing of existingListings) {
      if (!scrapedIds.has(listing.property24Id)) {
        await Listing.updateOne(
          { _id: listing._id },
          {
            status: 'sold',
            soldDate: new Date(),
          }
        );
        syncLog.removedListings++;
        console.log(`📌 Marked as sold: ${listing.property24Id}`);
      }
    }

    syncLog.endTime = new Date();
    syncLog.duration = Math.round((syncLog.endTime - startTime) / 1000);

    await SyncLog.create(syncLog);

    console.log(`✅ Sync complete! New: ${syncLog.newListings}, Updated: ${syncLog.updatedListings}, Removed: ${syncLog.removedListings}`);
    return syncLog;
  } catch (error) {
    syncLog.status = 'failed';
    syncLog.error = error.message;
    syncLog.endTime = new Date();
    syncLog.duration = Math.round((syncLog.endTime - startTime) / 1000);

    await SyncLog.create(syncLog);

    console.error('❌ Sync failed:', error.message);
    throw error;
  }
};
