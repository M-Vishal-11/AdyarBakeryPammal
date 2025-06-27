import mongoose from "mongoose";

const isOpenSchema = new mongoose.Schema({
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const isOpen = mongoose.models.isopen || mongoose.model("isopen", isOpenSchema);

export default isOpen;
