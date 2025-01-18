const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Dish schema
const dishSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  ingredients: [
    {
      name: { type: String, required: true },
      calories: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  calories: { type: Number, required: true }, // Total calories of the dish
});

module.exports = mongoose.model('Dish', dishSchema);
