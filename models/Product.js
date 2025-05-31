const mongoose = require('mongoose');

// Product schema with 7+ fields
const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: String,
  price: { 
    type: Number, 
    required: true 
  },
  category: String,
  quantity: Number,
  inStock: Boolean,
  supplier: String,
});

module.exports = mongoose.model('Product', productSchema);
