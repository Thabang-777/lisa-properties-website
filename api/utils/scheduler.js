import cron from 'node-cron';
import { syncProperty24Listings } from './syncEngine.js';

export const initializeScheduledTasks = () => {
  // Run sync at scheduled time (default: daily at 2 AM)
  const schedule = process.env.SYNC_SCHEDULE || '0 2 * * *';

  console.log(`⏰ Scheduling Property24 sync: ${schedule}`);

  cron.schedule(schedule, async () => {
    console.log('🔄 Running scheduled Property24 sync...');
    try {
      await syncProperty24Listings('system-cron');
    } catch (error) {
      console.error('❌ Scheduled sync failed:', error.message);
    }
  });

  // Optional: Run on server start for testing
  if (process.env.SYNC_ON_START === 'true') {
    console.log('🚀 Running initial sync on server start...');
    syncProperty24Listings('system-startup').catch((error) => {
      console.error('❌ Initial sync failed:', error.message);
    });
  }
};
