import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    unique: true,
    index: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    index: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
  },
  discountedPrice: {
    type: Number,
  },
  descriptions: {
    type: [String],
  },
  offer: {
    type: Boolean,
    index: true,
    default: false,
  },
});

const Products =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Products;
