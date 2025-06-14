// Main server file
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const app = express();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./middlewares/errorHandler');

const cors = require('cors');

// Load env variables
require('dotenv').config();

// Load DB and Passport config
require('./config/db')(); // Connect to MongoDB
require('./config/passport'); // GitHub OAuth setup


// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
//app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

//app.use('/api/products', require('./routes/productRoutes'));
//app.use('/api/categories', require('./routes/categoryRoutes'));
//app.use('/auth', require('./routes/authRoutes'));

// Swagger Documentation
require('./swagger/swagger')(app);

// Error Handling
app.use(errorHandler);

// Root
app.get('/', (req, res) => {
  res.send('Welcome to CRUD API Sales');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${process.env.BASE_URL}`);
});


// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
