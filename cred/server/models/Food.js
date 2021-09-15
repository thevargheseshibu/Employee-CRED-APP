const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    requried: true,
  },
  daysSinceIAte: {
    type: Number,
    requried: true,
  },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
