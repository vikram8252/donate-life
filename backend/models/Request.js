import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    urgent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//  delete after 24 hours 
requestSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 86400 }
);

export default mongoose.model("Request", requestSchema);

