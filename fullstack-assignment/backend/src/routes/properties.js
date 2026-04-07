const express = require('express');
const Property = require('../models/Property');
const Favourite = require('../models/Favourite');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/properties — Get all properties (with favourite status)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 }).lean();

    // Get user's favourite property IDs
    const favourites = await Favourite.find({ userId: req.user.id }).select('propertyId');
    const favouriteIds = new Set(favourites.map((f) => f.propertyId.toString()));

    // Attach is_favourite flag
    const result = properties.map((prop) => ({
      ...prop,
      is_favourite: favouriteIds.has(prop._id.toString()) ? 1 : 0,
    }));

    res.json({ properties: result });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET /api/properties/:id — Get single property
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).lean();

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const fav = await Favourite.findOne({
      userId: req.user.id,
      propertyId: property._id,
    });

    property.is_favourite = fav ? 1 : 0;

    res.json({ property });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

module.exports = router;
