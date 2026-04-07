const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Property = require('./models/Property');
const { sampleProperties } = require('./seeds/properties');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const favouritesRoutes = require('./routes/favourites');
const propertiesRoutes = require('./routes/properties');

app.use('/api/auth', authRoutes);
app.use('/api/favourites', favouritesRoutes);
app.use('/api/properties', propertiesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize database, seed, and start server
async function start() {
  await connectDB();

  // Seed properties if database is empty
  const count = await Property.countDocuments();
  if (count === 0) {
    await Property.insertMany(sampleProperties);
    console.log(`✅ Seeded ${sampleProperties.length} sample properties`);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

start().catch(console.error);
