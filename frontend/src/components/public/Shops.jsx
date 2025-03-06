// import React from 'react'
// import Layout from './layout/Layout'

// function Shops() {
//   return (
//     <Layout>
//       shops
//     </Layout>
//   )
// }

// export default Shops









import React from 'react'
import Layout from './layout/Layout'

const shopData = [
  { id: 1, name: "Handmade Crafts", image: "/image/shop1.jpg", price: "₹499", description: "Unique handcrafted items made by skilled women." },
  { id: 2, name: "Embroidered Clothing", image: "/image/shop2.jpg", price: "₹1,299", description: "Beautiful embroidery designs on traditional & modern wear." },
  { id: 3, name: "Mehndi & Art", image: "/image/shop3.jpg", price: "₹199", description: "Exclusive mehndi designs and artistic creations." },
  { id: 4, name: "Jewelry & Accessories", image: "/image/shop4.jpg", price: "₹799", description: "Handcrafted jewelry pieces that define elegance." },
  { id: 5, name: "Handwoven Bags", image: "/image/shop5.jpg", price: "₹999", description: "Eco-friendly handwoven bags crafted with love." },
  { id: 6, name: "Home Decor", image: "/image/shop6.jpg", price: "₹1,499", description: "Artistic home decor items for an elegant touch." },
  { id: 7, name: "Handmade Soaps", image: "/image/shop7.jpg", price: "₹299", description: "Organic handmade soaps with refreshing scents." },
  { id: 8, name: "Personalized Gifts", image: "/image/shop8.jpg", price: "₹699", description: "Customized gift items for special occasions." }
];

function Shops() {
  return (
    <Layout>
      <section className="p-12 bg-gray-100">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-4 uppercase">
          Discover Our Shops
        </h2>
        <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-10">
          Explore a variety of handcrafted products made by talented women. Support local artisans and shop for unique, high-quality items.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {shopData.map(shop => (
            <div key={shop.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="relative">
                <img src={shop.image} alt={shop.name} className="w-full h-64 object-cover"/>
                <span className="absolute top-2 left-2 bg-pink-400 text-white text-xs px-2 py-1 rounded">
                  Best Seller
                </span>
                <span className="absolute bottom-2 right-2 bg-white text-gray-800 text-sm font-bold px-2 py-1 rounded">
                  {shop.price}
                </span>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
                <p className="text-gray-600 text-sm">{shop.description}</p>
                <button className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Shops
