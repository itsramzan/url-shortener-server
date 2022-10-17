// Import essential modules
import mongoose from "mongoose";

// Initiate userSchema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
    },
    urls: [
      {
        type: mongoose.Types.ObjectId,
        ref: "url",
      },
    ],
  },
  { timestamps: true }
);

// Initiate User model
const User = mongoose.model("user", userSchema);

// Export User Model
export default User;
