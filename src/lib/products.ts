import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
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
  imageUrl: String,
  discountedPrice: Number,
  line1: String,
  line2: String,
  line3: String,
  line4: String,
  line5: String,
});

const Products =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Products;
