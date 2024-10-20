const mongoose = require("mongoose");

const { Schema } = mongoose;
//Schema
const productSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: {
    type: String,
    required: true,
    min: [0, "Worng min Discount"],
    max: [50, "Wrong max Discount"],
  },
  discription: String,
  quantity: {
    type: Number,
    required: true,
    min: 0, // Ensures that the quantity cannot be negative
  },
  category: { type: [String], required: true },
  price: { type: Number, min: [0, "Worng min Price"], required: true },
  discountPercentage: {
    type: Number,
    min: [0, "Worng min Discount"],
    max: [50, "Wrong max Discount"],
  },
  rating: {
    type: Number,
    min: [0, "Worng min rating"],
    max: [5, "Wrong max rating"],
  },
  brand: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});
exports.Product = mongoose.model("Product", productSchema);
