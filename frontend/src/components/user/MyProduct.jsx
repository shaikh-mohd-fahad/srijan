import React, { useContext, useEffect, useState } from 'react';
import Layout from './layout/Layout';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

function MyProducts() {
  const { mainUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      console.log("object, ",`http://localhost:3000/seller/products/${mainUser._id}`)
      const response = await axios.get(`http://localhost:3000/seller/products/${mainUser._id}`);
      setProducts(response.data.products);
      console.log("res",response)
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-5 m-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">My Products</h1>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            {/* Table Head */}
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4">Sr No</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Price</th>
                {/* <th className="py-3 px-4">Action</th> */}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {products.length > 0 ? (
                products.map((product, i) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 text-center">{i + 1}</td>
                    <td className="py-3 px-4 flex justify-center">
                      <Link to={`/user/viewproduct/${product._id}`}>
                        <img className="h-20 w-32 rounded-md shadow-md" src={`${product.image}`} alt={product.name} />
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-blue-600 font-medium">
                      <Link to={`/user/viewproduct/${product._id}`}>{product.name}</Link>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{product.description}</td>
                    <td className="py-3 px-4 font-bold text-green-600">₹{product.price}</td>
                    {/* <td className="py-3 px-4 flex justify-center items-center space-x-2 h-full">
  <Link to={`/user/editproduct/${product._id}`} className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-700 transition">
    <FiEdit /> Edit
  </Link>
  <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-700 transition">
    <FiTrash2 /> Remove
  </button>
</td> */}


                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default MyProducts;
