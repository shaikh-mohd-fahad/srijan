import React, { useContext } from "react";
import Layout from "./layout/Layout";
import { FaStore, FaUserCheck, FaListAlt, FaShippingFast } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function BecomeSeller() {
  const { mainUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStartSelling = async () => {
    try {
      const response = await axios.post("http://localhost:3000/seller/start-selling", {
        studentId: mainUser._id
      });

      const { status, message, sellerId } = response.data;

      if (status === "success") {
        console.log(message, sellerId);
        navigate("/user/listproduct");  // ✅ redirect to listproduct page
      } else {
        console.error("Failed to start selling:", message);
        alert("Something went wrong: " + message);
      }

    } catch (error) {
      console.error("Error starting selling:", error);
      alert("Server error: " + error.message);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Become a Seller
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Start selling your products online and reach thousands of customers!
        </p>

        {/* Steps to Become a Seller */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-5 text-center transform transition-transform duration-300 hover:scale-105">
            <FaUserCheck className="text-blue-500 text-4xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-gray-700">Register</h3>
            <p className="text-gray-500">Sign up as a seller with basic details.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-5 text-center transform transition-transform duration-300 hover:scale-105">
            <FaStore className="text-green-500 text-4xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-gray-700">Set Up Store</h3>
            <p className="text-gray-500">Create your shop and add product listings.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-5 text-center transform transition-transform duration-300 hover:scale-105">
            <FaListAlt className="text-yellow-500 text-4xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-gray-700">List Products</h3>
            <p className="text-gray-500">Upload high-quality images and details.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-5 text-center transform transition-transform duration-300 hover:scale-105">
            <FaShippingFast className="text-red-500 text-4xl mx-auto mb-3" />
            <h3 className="font-semibold text-lg text-gray-700">Start Selling</h3>
            <p className="text-gray-500">Receive orders and ship products to customers.</p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-8 text-center">
          <button
            onClick={handleStartSelling}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300"
          >
            Start Selling Now
          </button>

          <Link to="/user/my-products">
        <button className="ml-5 bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition duration-300">My Products</button>
      </Link>
        </div>
      </div>
    </Layout>
  );
}

export default BecomeSeller;
