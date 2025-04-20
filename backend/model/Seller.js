import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
  bio: { type: String, default: "I am a skilled artisan on Srijan!" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
});

export const Seller = mongoose.model("Seller", SellerSchema);