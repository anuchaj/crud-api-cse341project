const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { ensureAuth } = require('../middleware/ensureAuth');

// Protect all routes with authentication
router.get('/', ensureAuth, controller.getAll);
router.get('/:id', ensureAuth, controller.getById);
router.post('/', ensureAuth, controller.create);
router.put('/:id', ensureAuth, controller.update);
router.delete('/:id', ensureAuth, controller.remove);

module.exports = router;
