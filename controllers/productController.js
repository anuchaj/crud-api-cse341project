const mongoose = require('mongoose');
const Product = require('../models/productModel');

// GET all products
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET product by ID
exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Protected (OAuth login required)
 */
exports.create = async (req, res) => {
  try {
    // Extract fields from the request body
    const { name, price, description, category, quantity, inStock, supplier } = req.body;

    // Validate required fields
    if (!name || price == null) {
      return res.status(400).json({ message: 'Name and price are required.' });
    }

    // Create a new product object
    const product = new Product({
      name,
      price,
      description,
      category,
      quantity,
      inStock,
      supplier,
      createdBy: req.user._id, // Automatically associate product with the logged-in user
    });

    // Save the product to the database
    const savedProduct = await product.save();

    // Send a success response
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(400).json({ error: 'Failed to create product. ' + err.message });
  }
};

/**
 * @desc    Update a product by ID
 * @route   PUT /api/products/:id
 * @access  Protected (OAuth login required)
 */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ 1. Check if the ID is provided and is a valid MongoDB ObjectId
    if (!id || id === '0' || id.trim() === '') {
      return res.status(400).json({ message: 'Invalid or missing product ID.' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format.' });
    }

    // ✅ 2. Optionally: Validate the fields you expect to update (e.g., price must be a number)
    if ('price' in req.body && isNaN(Number(req.body.price))) {
      return res.status(400).json({ message: 'Price must be a valid number.' });
    }
    if ('quantity' in req.body && isNaN(Number(req.body.quantity))) {
      return res.status(400).json({ message: 'Quantity must be a valid number.' });
    }

    // ✅ 3. Update product and return the updated document
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,           // Return the modified document rather than the original
      runValidators: true, // Run schema validations on the update
    });

    // ✅ 4. Handle case when product is not found
    if (!updated) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // ✅ 5. Success response
    res.json(updated);
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};


// DELETE product
exports.remove = async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* 
// POST or create new product
exports.create = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ message: 'Name and price required' });
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; */


/* 
// PUT update product
exports.update = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true, // check code runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; */