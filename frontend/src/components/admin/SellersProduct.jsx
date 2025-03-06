import React, { useState } from 'react';
import Layout from './layout/Layout';

function SellersProduct() {
  // Sample product data
  const [products, setProducts] = useState([
    { id: 1, name: 'Handmade Bag', category: 'Sewing', price: '₹500', seller: 'Priya Sharma' },
    { id: 2, name: 'Embroidered Kurti', category: 'Embroidery', price: '₹1200', seller: 'Aisha Khan' },
    { id: 3, name: 'Mehndi Design Service', category: 'Mehndi Art', price: '₹700', seller: 'Neha Gupta' },
    { id: 4, name: 'DIY Home Decor', category: 'Crafts', price: '₹850', seller: 'Ananya Verma' },
  ]);

  const handleEdit = (id) => {
    console.log(`Edit product with ID: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Sellers' Products</h1>

        {/* Add Product Button */}
        <div className="flex justify-end mb-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Add New Product
          </button>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Seller</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4">{product.seller}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No products available.</p>
        )}
      </div>
    </Layout>
  );
}

export default SellersProduct;
