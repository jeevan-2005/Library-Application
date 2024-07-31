const mongoose = require("mongoose");
const { Schema } = mongoose; // Import Schema from mongoose

const emailVerificationTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
      unique: true,
    },
    token: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // This defines the expiration time
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model(
  "emailVerificationToken",
  emailVerificationTokenSchema
);
