import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  available: {
    type: Boolean,
    default: true,
  },
  imageUrl: String,
  discountedPrice: Number,
  descriptions: Array,
});

const Products =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Products;
