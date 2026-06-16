import express from 'express';
import Admin from '../models/Admin.js';
import { authMiddleware, generateToken } from '../middleware/auth.js';

const router = express.Router();

// Register (create first admin)
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const admin = await Admin.create({
      email,
      password,
      name,
      role: 'super_admin',
    });

    const token = generateToken(admin);

    res.status(201).json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await admin.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!admin.isActive) {
      return res.status(403).json({ error: 'Account is inactive' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin);

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current admin profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
