// Main server file

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

// Load env variables
dotenv.config();

// Load DB and Passport config
require('./config/db')(); // Connect to MongoDB
require('./config/passport'); // Google OAuth setup

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

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

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/auth', require('./routes/authRoutes'));

// Root
app.get('/', (req, res) => {
  res.send('Welcome to CRUD API Sales');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
