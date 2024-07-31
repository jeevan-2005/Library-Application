const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  role: { type: String, enum: ["STUDENT", "ADMIN"], required: true },
  verified: {type: Boolean, default: false}
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;