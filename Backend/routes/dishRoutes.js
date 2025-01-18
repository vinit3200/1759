const express = require('express');
const router = express.Router();
const {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
} = require('../controllers/dishController');

// Route to create a dish
router.post('/dishes', createDish);

// Route to get all dishes
router.get('/dishes', getAllDishes);

// Route to get a single dish by ID
router.get('/dishes/:id', getDishById);

// Route to update a dish by ID
router.put('/dishes/:id', updateDish);

// Route to delete a dish by ID
router.delete('/dishes/:id', deleteDish);

module.exports = router;