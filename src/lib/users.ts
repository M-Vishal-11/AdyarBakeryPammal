import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  PhoneNumber: {
    type: Number,
    required: [true, "Phone Number is required"],
  },
  area: {
    type: String,
    required: [true, "User's area is required"],
  },
  street: {
    type: String,
    required: [true, "User's street is required"],
  },
  houseInfo: {
    type: String,
    required: [true, "User's house info is required"],
  },
  googleMap: String,
  deliveryNote: String,
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;
