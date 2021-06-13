import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  role: { type: String, required: true },
  name: { type: String, required: true }, // Student, group, org
  regNum: { type: String }, // Only for org
  contactNum: { type: Number }, // group, org
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
