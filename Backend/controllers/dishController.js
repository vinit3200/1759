const Dish = require('../models/dish');

// Calculate Total Calories for the Dish based on ingredients
const calculateTotalCalories = (ingredients) => {
  return ingredients.reduce((total, ingredient) => 
    total + (ingredient.calories * ingredient.quantity), 0
  );
};

// Create a new dish
exports.createDish = async (req, res) => {
  const { name, description, ingredients } = req.body;

  if (!name || !ingredients) {
    return res.status(400).json({ message: 'Dish name and ingredients are required.' });
  }

  const totalCalories = calculateTotalCalories(ingredients);

  try {
    const newDish = new Dish({ name, description, ingredients, calories: totalCalories });
    await newDish.save();
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: 'Error creating dish', error });
  }
};

// Get all dishes
exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dishes', error });
  }
};

// Get a single dish by ID
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dish', error });
  }
};

// Update a dish (including ingredients and re-calculating total calories)
exports.updateDish = async (req, res) => {
  try {
    const { name, description, ingredients } = req.body;
    const totalCalories = calculateTotalCalories(ingredients);

    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id, 
      { name, description, ingredients, calories: totalCalories },
      { new: true }
    );
    
    if (!updatedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(500).json({ message: 'Error updating dish', error });
  }
};

// Delete a dish
exports.deleteDish = async (req, res) => {
  try {
    const deletedDish = await Dish.findByIdAndDelete(req.params.id);
    if (!deletedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dish', error });
  }
};
