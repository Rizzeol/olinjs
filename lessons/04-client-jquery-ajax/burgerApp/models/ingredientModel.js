var mongoose = require('mongoose');

// Create ingredient Schema
var ingredientSchema = mongoose.Schema({
  name: String,
  price: Number,
  inStock: Boolean
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
