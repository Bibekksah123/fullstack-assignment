const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Property = require('../models/Property');
const connectDB = require('../config/db');

const sampleProperties = [
  {
    title: 'Modern Downtown Apartment',
    address: '123 Main St, Downtown, NY 10001',
    price: 350000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    propertyType: 'apartment',
    description: 'A sleek, modern apartment in the heart of downtown with floor-to-ceiling windows and city views.',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
  },
  {
    title: 'Cozy Family Home',
    address: '456 Oak Ave, Suburbs, NJ 07030',
    price: 520000,
    bedrooms: 4,
    bathrooms: 2,
    sqft: 2200,
    propertyType: 'house',
    description: 'Spacious family home with a large backyard, updated kitchen, and quiet neighborhood.',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
  },
  {
    title: 'Luxury Penthouse',
    address: '789 Sky Tower, City Center, NY 10019',
    price: 1200000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3500,
    propertyType: 'penthouse',
    description: 'Exclusive penthouse with panoramic skyline views, private terrace, and premium finishes throughout.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
  },
  {
    title: 'Starter Condo',
    address: '101 First St, East Side, NY 10009',
    price: 180000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    propertyType: 'condo',
    description: 'Perfect starter home with modern amenities, in-unit laundry, and close to public transit.',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
  },
  {
    title: 'Beachfront Villa',
    address: '222 Ocean Dr, Coastal, FL 33139',
    price: 890000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4100,
    propertyType: 'villa',
    description: 'Stunning beachfront villa with direct ocean access, infinity pool, and tropical landscaping.',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
  },
  {
    title: 'Urban Studio Loft',
    address: '88 Loft Lane, Arts District, CA 90013',
    price: 275000,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 520,
    propertyType: 'studio',
    description: 'Industrial-chic studio loft with exposed brick, high ceilings, and an open floor plan.',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  },
  {
    title: 'Charming Townhouse',
    address: '55 Maple Row, Georgetown, DC 20007',
    price: 685000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    propertyType: 'townhouse',
    description: 'Historic brick townhouse with original hardwood floors, updated kitchen, and a private garden.',
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop',
  },
  {
    title: 'Lakeside Retreat',
    address: '900 Lakeview Rd, Tahoe, CA 96150',
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    propertyType: 'house',
    description: 'Peaceful lakeside home with a private dock, mountain views, and a cozy stone fireplace.',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
  },
  {
    title: 'Midtown Luxury Condo',
    address: '300 Park Ave, Midtown, NY 10022',
    price: 995000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    propertyType: 'condo',
    description: 'High-rise luxury condo with concierge, rooftop pool, and floor-to-ceiling Manhattan views.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
  },
  {
    title: 'Countryside Farmhouse',
    address: '1200 Country Rd, Vermont, VT 05401',
    price: 420000,
    bedrooms: 5,
    bathrooms: 3,
    sqft: 3200,
    propertyType: 'house',
    description: 'Renovated farmhouse on 5 acres with barn, wrap-around porch, and scenic mountain backdrop.',
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop',
  },
];

async function seedProperties() {
  try {
    await connectDB();

    const count = await Property.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} properties. Skipping seed.`);
      process.exit(0);
    }

    await Property.insertMany(sampleProperties);
    console.log(`✅ Seeded ${sampleProperties.length} sample properties`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedProperties();
}

module.exports = { sampleProperties, seedProperties };
