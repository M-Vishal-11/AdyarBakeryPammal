import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: true,
  },
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
  orders: String,
  totalAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: [
      "waiting",
      "preparing",
      "on_the_way",
      "rejected",
      "cancelled",
      "delivered",
    ],
    default: "waiting",
  },
  payment: {
    type: String,
    default: "pending",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
});

const UserOrders =
  mongoose.models.UserOrders || mongoose.model("UserOrders", OrderSchema);
export default UserOrders;
