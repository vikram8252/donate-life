import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    phone: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    lastDonationDate: {
      type: Date,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Donor", donorSchema);
