import express from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth.js';
import { importListingsFromCSV, generateCSVTemplate } from '../utils/csvImporter.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Get CSV template
router.get('/template', (req, res) => {
  try {
    const template = generateCSVTemplate();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="listings-template.csv"');
    res.send(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Import CSV
router.post('/import', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'CSV file required' });
    }

    const csvContent = req.file.buffer.toString('utf-8');
    const syncLog = await importListingsFromCSV(csvContent, req.admin.email);

    res.json(syncLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
