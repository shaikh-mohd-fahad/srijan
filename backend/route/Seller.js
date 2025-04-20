import express from "express";
import mongoose from "mongoose";
import { Seller } from "../model/Seller.js";
import { Product } from "../model/Product.js";
import fs from "fs";
import path from "path";
import multer from "multer";

const router = express.Router();

// Multer setup (already present)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "uploads/products");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed!"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("productImage");

// Existing /add-product (unchanged)...
router.post("/add-product", upload, async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const studentId = req.body.studentId;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      console.error("Invalid studentId:", studentId);
      return res.status(400).json({ message: "Invalid studentId" });
    }
    if (!name || !price || !category) {
      console.error("Missing required fields:", { name, price, category });
      return res.status(400).json({ message: "Name, price, and category are required." });
    }

    const seller = await Seller.findOne({ studentId });
    if (!seller) {
      console.error("Not a seller:", studentId);
      return res.status(403).json({ message: "You must be a registered seller to list products." });
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      console.error("Invalid price:", price);
      return res.status(400).json({ message: "Price must be a positive number." });
    }

    const validCategories = ["Clothing", "Sweater", "Embroidery Design", "Other"];
    if (!validCategories.includes(category)) {
      console.error("Invalid category:", category);
      return res.status(400).json({ message: "Invalid category." });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = `http://localhost:3000/uploads/products/${req.file.filename}`;
    } else {
      console.warn("No product image uploaded for product:", name);
      return res.status(400).json({ message: "Product image is required." });
    }

    const product = new Product({
      sellerId: studentId,
      name,
      description,
      price: priceValue,
      category,
      image: imageUrl,
    });
    await product.save();
    console.log("Product created:", product);

    seller.products.push(product._id);
    await seller.save();
    console.log("Updated seller with new product:", seller);

    res.json({ message: "Product listed successfully!" });
  } catch (error) {
    console.error("Error adding product:", error.message, error.stack);
    if (error.message.includes("Only .jpg, .jpeg, and .png files are allowed")) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes("File too large")) {
      return res.status(400).json({ message: "File size exceeds 5MB limit." });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// New endpoint: Check if user is a seller
router.get("/check-seller/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      console.error("Invalid studentId:", studentId);
      return res.status(400).json({ message: "Invalid studentId" });
    }

    const seller = await Seller.findOne({ studentId });
    if (!seller) {
      console.log("Not a seller:", studentId);
      return res.status(403).json({ message: "You must be a registered seller to access this page." });
    }

    res.json({ isSeller: true, sellerId: seller._id });
  } catch (error) {
    console.error("Error checking seller status:", error.message, error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/start-selling", async (req, res) => {
    try {
      const { studentId } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        console.error("Invalid studentId:", studentId);
        return res.status(400).json({ status: "failure", message: "Invalid studentId" });
      }
  
      let seller = await Seller.findOne({ studentId });
  
      if (!seller) {
        seller = new Seller({ studentId });
        await seller.save();
        console.log("New seller created:", seller);
        return res.json({ status: "success", message: "Seller account created successfully", sellerId: seller._id });
      } else {
        console.log("Seller already exists:", seller._id);
        return res.json({ status: "success", message: "Seller account already exists", sellerId: seller._id });
      }
  
    } catch (error) {
      console.error("Error starting selling process:", error.message, error.stack);
      res.status(500).json({ status: "failure", message: "Server error", error: error.message });
    }
  });

  // Route to get all products for a seller
router.get("/products/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;
    console.log("para", req.params)
    // Validate sellerId
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ message: "Invalid sellerId" });
    }

    // Fetch all products for the seller
    const products = await Product.find({ sellerId:sellerId });
    console.log("prdocuts", products)

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this seller." });
    }

    res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error.message, error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

  
  
  

export default router;