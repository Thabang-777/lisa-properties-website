import express from 'express';
import Listing from '../models/Listing.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all listings with search/filter
router.get('/', async (req, res) => {
  try {
    const { status, propertyType, minPrice, maxPrice, bedrooms, search, page = 1, limit = 12 } = req.query;

    let query = {};

    if (status) query.status = status;
    if (propertyType) query.propertyType = propertyType;
    if (bedrooms) query.bedrooms = parseInt(bedrooms);

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = `R ${minPrice}`;
      if (maxPrice) query.price.$lte = `R ${maxPrice}`;
    }

    if (search) {
      query.$or = [
        { location: { $regex: search, $options: 'i' } },
        { abbreviated: { $regex: search, $options: 'i' } },
        { fullDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const listings = await Listing.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Listing.countDocuments(query);

    res.json({
      listings,
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

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new listing (manual)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const listingData = {
      source: 'manual',
      ...req.body,
      agent: 'Lisa Aphane',
      agentId: process.env.PROPERTY24_AGENT_ID,
      listingDate: new Date(),
    };

    const listing = await Listing.create(listingData);
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update listing
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, ...updateData } = req.body;

    // If status is being updated, track who changed it
    if (status) {
      updateData.status = status;
      updateData.statusUpdatedBy = req.admin.email;
      updateData.statusUpdatedAt = new Date();
    }

    const listing = await Listing.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete listing (soft delete - mark as withdrawn)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        status: 'withdrawn',
        statusUpdatedBy: req.admin.email,
        statusUpdatedAt: new Date(),
      },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json({ message: 'Listing withdrawn', listing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bulk update status
router.patch('/bulk/status', authMiddleware, async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!ids || !status) {
      return res.status(400).json({ error: 'IDs and status required' });
    }

    const result = await Listing.updateMany(
      { _id: { $in: ids } },
      {
        status,
        statusUpdatedBy: req.admin.email,
        statusUpdatedAt: new Date(),
      }
    );

    res.json({
      message: `Updated ${result.modifiedCount} listings`,
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark as featured
router.patch('/:id/featured', authMiddleware, async (req, res) => {
  try {
    const { isFeatured } = req.body;

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { isFeatured },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
