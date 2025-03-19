import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "responded", "resolved"],
      default: "pending",
    },
    adminResponse: {
      type: String,
      default: "",
    },
    respondedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Query", querySchema); 