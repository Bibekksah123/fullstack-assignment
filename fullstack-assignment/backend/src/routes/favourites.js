const express = require('express');
const Favourite = require('../models/Favourite');
const Property = require('../models/Property');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/favourites — Get current user's favourites
router.get('/', async (req, res) => {
  try {
    const favourites = await Favourite.find({ userId: req.user.id })
      .populate('propertyId')
      .sort({ createdAt: -1 });

    // Flatten the populated data for frontend compatibility
    const result = favourites
      .filter((f) => f.propertyId) // guard against deleted properties
      .map((f) => ({
        ...f.propertyId.toObject(),
        favourited_at: f.createdAt,
      }));

    res.json({ favourites: result });
  } catch (error) {
    console.error('Get favourites error:', error);
    res.status(500).json({ error: 'Failed to fetch favourites' });
  }
});

// POST /api/favourites/:propertyId — Add property to favourites
router.post('/:propertyId', async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if already favourited
    const existing = await Favourite.findOne({
      userId: req.user.id,
      propertyId,
    });

    if (existing) {
      return res.status(409).json({ error: 'Property already in favourites' });
    }

    await Favourite.create({ userId: req.user.id, propertyId });

    res.status(201).json({ message: 'Property added to favourites' });
  } catch (error) {
    console.error('Add favourite error:', error);
    res.status(500).json({ error: 'Failed to add favourite' });
  }
});

// DELETE /api/favourites/:propertyId — Remove property from favourites
router.delete('/:propertyId', async (req, res) => {
  try {
    const { propertyId } = req.params;

    const result = await Favourite.findOneAndDelete({
      userId: req.user.id,
      propertyId,
    });

    if (!result) {
      return res.status(404).json({ error: 'Property not in your favourites' });
    }

    res.json({ message: 'Property removed from favourites' });
  } catch (error) {
    console.error('Remove favourite error:', error);
    res.status(500).json({ error: 'Failed to remove favourite' });
  }
});

module.exports = router;
