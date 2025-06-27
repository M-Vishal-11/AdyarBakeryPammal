import mongoose from "mongoose";

const isOpenSchema = new mongoose.Schema({
  isOpen: Boolean,
});

const isOpen = mongoose.model("isopen", isOpenSchema);

export default isOpen;
