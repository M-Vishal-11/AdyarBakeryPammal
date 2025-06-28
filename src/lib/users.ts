import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: true,
  },
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  area: {
    type: String,
  },
  street: {
    type: String,
  },
  flat: {
    type: String,
  },
  googleMap: String,
  deliveryNote: String,
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;
