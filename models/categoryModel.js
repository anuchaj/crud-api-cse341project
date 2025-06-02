const mongoose = require('mongoose');

// Define the schema for the Category collection
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Categories should have unique names
    trim: true
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Category', categorySchema);
