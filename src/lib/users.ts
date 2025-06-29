import mongoose from "mongoose";

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
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);
export default Users;
