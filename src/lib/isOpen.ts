import mongoose from "mongoose";

const isOpenSchema = new mongoose.Schema(
  {
    isOpen: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Number,
      default: 0,
    },
  },
  { strict: false }
);

const isOpen = mongoose.models.isopen || mongoose.model("isopen", isOpenSchema);

export default isOpen;
