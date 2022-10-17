// Import essential modules
import mongoose from "mongoose";

// Initiate urlSchema
const urlSchema = new mongoose.Schema(
  {
    uniqueText: {
      type: "String",
      required: true,
    },
    fullUrl: {
      type: "String",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

// Initiate URL Model
const URL = mongoose.model("url", urlSchema);

// Export URL model
export default URL;
