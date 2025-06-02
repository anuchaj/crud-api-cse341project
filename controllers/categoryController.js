const Category = require('../models/categoryModel');

// GET /api/categories - Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err); // Pass error to global handler
  }
};

// POST /api/categories - Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category({ name, description });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    next(err); // Pass error to global handler
  }
};

// PUT /api/categories/:id - Update a category
exports.updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(updatedCategory);
  } catch (err) {
    next(err); // Pass error to global handler
  }
};

// DELETE /api/categories/:id - Delete a category
exports.deleteCategory = async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted' });
  } catch (err) {
    next(err); // Pass error to global handler
  }
};
