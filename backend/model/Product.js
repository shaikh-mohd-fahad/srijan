import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, enum: ["Clothing", "Sweater", "Embroidery Design", "Other"], default: "Other" },
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", ProductSchema);