import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  role: { type: String },
  name: { type: String }, // Student, group, org
  regNum: { type: String }, // Only for org
  contactNum: { type: Number }, // group, org
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
export default User;
