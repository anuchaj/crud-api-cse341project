const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');
const { ensureAuth } = require('../middleware/ensureAuth');

// Protect some/all routes with authentication
router.get('/', controller.getAll);

// router.get('/', ensureAuth, (req, res) => {
  // Only logged-in users can access this
  //res.json({ message: 'You are authorized', user: req.user });
//});

module.exports = router;
