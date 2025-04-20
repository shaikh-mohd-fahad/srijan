import Layout from "./layout/Layout";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const ListProduct = () => {
  const { token, mainUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Clothing",
    productImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // useEffect(() => {
  //   const checkSellerStatus = async () => {
  //     try {
  //       if (!token || !mainUser?._id) {
  //         toast.error("Please log in to list a product.");
  //         navigate("/login");
  //         return;
  //       }

  //       // Check if the user is a seller using the new endpoint
  //       const response = await api.get(`/seller/check-seller/${mainUser._id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       if (!response.data.isSeller) {
  //         toast.error("You must be a registered seller to list products.");
  //         navigate("/user/become-seller");
  //       }
  //     } catch (error) {
  //       console.error("Error checking seller status:", error);
  //       if (error.response?.status === 403) {
  //         toast.error("You must be a registered seller to list products.");
  //         navigate("/user/become-seller");
  //       } else {
  //         toast.error("Failed to verify seller status.");
  //         navigate("/user/dashboard");
  //       }
  //     }
  //   };

  //   checkSellerStatus();
  // }, [token, mainUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Client-side validation for file type and size
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPG and PNG files are allowed!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit!");
        return;
      }

      setFormData((prev) => ({ ...prev, productImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("studentId", mainUser._id);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (formData.productImage) {
        data.append("productImage", formData.productImage);
      }

      const response = await api.post("/seller/add-product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Add product response:", response.data);
      toast.success("Product listed successfully!");
      setTimeout(() => navigate("/seller/products"), 2000); // Temporary redirect until dashboard is created
    } catch (error) {
      console.error("Error listing product:", error);
      if (error.response?.status === 403) {
        toast.error("You must be a registered seller to list products.");
        navigate("/user/become-seller");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Failed to list product.");
      } else {
        toast.error("Failed to list product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-8">List Your Product on Srijan</h2>
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Handmade Sweater"
                required
                aria-label="Product Name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Describe your product..."
                aria-label="Product Description"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                Price (in INR)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 500"
                min="1"
                step="1"
                required
                aria-label="Product Price"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-label="Product Category"
              >
                <option value="Clothing">Clothing</option>
                <option value="Sweater">Sweater</option>
                <option value="Embroidery Design">Embroidery Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="productImage" className="block text-gray-700 font-medium mb-2">
                Product Photo (JPG/PNG, max 5MB)
              </label>
              <input
                type="file"
                id="productImage"
                name="productImage"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-lg"
                required
                aria-label="Product Photo Upload"
              />
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Product Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label={loading ? "Listing Product" : "List Product"}
            >
              {loading ? "Listing Product..." : "List Product"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ListProduct;