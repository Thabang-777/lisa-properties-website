import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { initializeScheduledTasks } from './utils/scheduler.js';

// Routes
import authRoutes from './routes/auth.js';
import listingsRoutes from './routes/listings.js';
import syncRoutes from './routes/sync.js';
import csvRoutes from './routes/csv.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: '✅ API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/sync', syncRoutes);
app.use('/api/csv', csvRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB();

    // Initialize scheduled tasks
    initializeScheduledTasks();

    app.listen(PORT, () => {
      console.log(`
✅ Lisa Properties API Server Running
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Port: ${PORT}
Environment: ${process.env.NODE_ENV || 'development'}
Frontend: ${process.env.FRONTEND_URL || 'http://localhost:3000'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Available Endpoints:
  POST   /api/auth/register       - Create first admin
  POST   /api/auth/login          - Admin login
  GET    /api/listings            - Get all listings (with filters)
  POST   /api/listings            - Create manual listing
  PATCH  /api/listings/:id        - Update listing
  DELETE /api/listings/:id        - Withdraw listing
  POST   /api/sync/sync           - Trigger manual sync
  GET    /api/sync/logs           - View sync logs
  GET    /api/csv/template        - Download CSV template
  POST   /api/csv/import          - Import listings from CSV
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
