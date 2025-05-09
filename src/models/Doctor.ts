import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    qualification: { type: String, required: true },
    location: { type: String, required: true },
    clinic: { type: String, required: true },
    fee: { type: Number, required: true },
    cashback: { type: String },
    consultationMode: {
      type: [String],
      enum: ["In-Person", "Online", "Both"],
      required: true,
    },
    availability: { type: String },
    languages: { type: [String], default: ["English"] },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    facilities: { type: [String] },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);
export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
