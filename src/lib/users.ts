import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: uuidv4,
    unique: true,
    index: true,
  },
  date: {
    type: Date,
    default: () => new Date(),
  },
  orders: {
    type: Map,
    of: Number,
  },
  totalAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["waiting", "preparing", "On_the_way", "rejected"],
    default: "pending",
  },
});

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: true,
    unique: true,
  },
  name: String,
  phoneNumber: String,
  area: String,
  street: String,
  flat: String,
  googleMap: String,
  deliveryNote: String,
  orders: [OrderSchema], // Array of order objects
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);
export default Users;
