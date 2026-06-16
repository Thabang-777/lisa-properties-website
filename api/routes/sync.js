import express from 'express';
import SyncLog from '../models/SyncLog.js';
import { authMiddleware } from '../middleware/auth.js';
import { syncProperty24Listings } from '../utils/syncEngine.js';

const router = express.Router();

// Trigger manual sync
router.post('/sync', authMiddleware, async (req, res) => {
  try {
    const syncLog = await syncProperty24Listings(req.admin.email);
    res.json(syncLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sync logs
router.get('/logs', async (req, res) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;

    let query = {};
    if (type) query.syncType = type;
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const logs = await SyncLog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await SyncLog.countDocuments(query);

    res.json({
      logs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get latest sync log
router.get('/logs/latest', async (req, res) => {
  try {
    const latestLog = await SyncLog.findOne().sort({ createdAt: -1 });
    res.json(latestLog || { message: 'No sync logs yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
