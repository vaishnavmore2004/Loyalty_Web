const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Add CORS middleware BEFORE routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow your Vite frontend
  methods: ['GET', 'POST'],
  credentials: true,
}));

// ✅ Other middleware
app.use(express.json());

// ✅ Import routes
const claimRoutes = require('./routes/claim');
const pointsRoutes = require('./routes/points');

// ✅ Use routes
app.use('/api/points', pointsRoutes);
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api', claimRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
