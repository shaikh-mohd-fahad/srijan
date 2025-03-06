// import React from 'react'
// import Layout from './layout/Layout'
// import img1 from "../../../public/image/profile.jpg"
// function Aboutus() {
//   return (
//     <Layout>
//       <section className="flex flex-col md:flex-row items-center p-6">
//         <div className="w-full md:w-1/2 p-4">
//             <img src={img1} className="w-full h-auto rounded-lg shadow-lg" alt="Empowering Women"/>
//         </div>
//         <div className="w-full md:w-1/2 p-4">
//             <h2 className="text-4xl font-bold text-blue-500 mb-4">Empowering Women, Transforming Lives</h2>
//             <p className="text-gray-700 text-lg mb-4">
//                 Srijan is dedicated to uplifting village women by providing them with essential skills such as sewing, embroidery, and other crafts. Our mission is to create opportunities for women to learn and grow.
//             </p>
//         </div>
//     </section>

//     <section className="flex flex-col-reverse md:flex-row items-center p-6 bg-white">
//         <div className="w-full md:w-1/2 p-4">
//             <h2 className="text-4xl font-bold text-blue-500 mb-4">Skill Development Workshops</h2>
//             <p className="text-gray-700 text-lg mb-4">
//                 We organize workshops where village women learn practical skills like sewing and embroidery. These workshops are not only about mastering crafts but also about building confidence and self-reliance.
//             </p>
//         </div>
//         <div className="w-full md:w-1/2 p-4">
//             <img src={img1} alt="Skill Development Workshops" className="w-full h-auto rounded-lg shadow-lg"/>
//         </div>
//     </section>

//     <section className="flex flex-col md:flex-row items-center p-6">
//         <div className="w-full md:w-1/2 p-4">
//             <img src={img1} alt="Economic Independence" className="w-full h-auto rounded-lg shadow-lg"/>
//         </div>
//         <div className="w-full md:w-1/2 p-4">
//             <h2 className="text-4xl font-bold text-blue-500 mb-4">Economic Independence</h2>
//             <p className="text-gray-700 text-lg mb-4">
//                 By providing women with marketable skills, we aim to give them the power to earn their own income, improving their standard of living and helping them contribute to their households.
//             </p>
//         </div>
//     </section>

//     <section className="flex flex-col-reverse md:flex-row items-center p-6 bg-white">
//         <div className="w-full md:w-1/2 p-4">
//             <h2 className="text-4xl font-bold text-blue-500 mb-4">Flexible Job Opportunities</h2>
//             <p className="text-gray-700 text-lg mb-4">
//                 Srijan connects skilled women with job opportunities that match their abilities and schedule. Whether it's part-time work or home-based projects, we help them find the right job to suit their needs.
//             </p>
//         </div>
//         <div className="w-full md:w-1/2 p-4">
//             <img src={img1} alt="Job Opportunities" className="w-full h-auto rounded-lg shadow-lg"/>
//         </div>
//     </section>

//     <section className="flex flex-col md:flex-row items-center p-6">
//         <div className="w-full md:w-1/2 p-4">
//             <img src={img1} alt="Our Vision" className="w-full h-auto rounded-lg shadow-lg"/>
//         </div>
//         <div className="w-full md:w-1/2 p-4">
//             <h2 className="text-4xl font-bold text-blue-500 mb-4">Our Vision</h2>
//             <p className="text-gray-700 text-lg mb-4">
//                 Our vision is to create a future where every woman in rural India has access to the skills, resources, and opportunities needed to achieve economic independence and empowerment.
//             </p>
//         </div>
//     </section>
//     </Layout>
//   )
// }

// export default Aboutus











import React from 'react'
import Layout from './layout/Layout'

function Aboutus() {
  return (
    <Layout>
      <section className="flex flex-col md:flex-row items-center p-12 bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg">
        <div className="w-full md:w-1/2 p-6 flex justify-center">
          <img src="/public/image/aboutus1.avif" className="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300 object-cover" alt="Empowering Women"/>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-4xl font-bold text-blue-600 mb-4 border-l-4 border-blue-400 pl-4 hover:text-blue-700 transition-all duration-300">
            Empowering Women, Transforming Lives
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
            Srijan is dedicated to uplifting village women by providing them with essential skills such as sewing, embroidery, and other crafts. Our mission is to create opportunities for women to learn and grow.
          </p>
        </div>
      </section>

      <section className="flex flex-col-reverse md:flex-row items-center p-12 bg-gray-100 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-4xl font-bold text-blue-600 mb-4 border-l-4 border-blue-400 pl-4 hover:text-blue-700 transition-all duration-300">
            Skill Development Workshops
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
            We organize workshops where village women learn practical skills like sewing and embroidery. These workshops are not only about mastering crafts but also about building confidence and self-reliance.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-6 flex justify-center">
          <img src="/public/image/aboutus2.avif" alt="Skill Development Workshops" className="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300 object-cover"/>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center p-12 bg-blue-50 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 p-6 flex justify-center">
          <img src="/public/image/aboutus3.webp" alt="Economic Independence" className="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300 object-cover"/>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-4xl font-bold text-blue-600 mb-4 border-l-4 border-blue-400 pl-4 hover:text-blue-700 transition-all duration-300">
            Economic Independence
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
            By providing women with marketable skills, we aim to give them the power to earn their own income, improving their standard of living and helping them contribute to their households.
          </p>
        </div>
      </section>

      <section className="flex flex-col-reverse md:flex-row items-center p-12 bg-gray-100 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-4xl font-bold text-blue-600 mb-4 border-l-4 border-blue-400 pl-4 hover:text-blue-700 transition-all duration-300">
            Flexible Job Opportunities
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
            Srijan connects skilled women with job opportunities that match their abilities and schedule. Whether it's part-time work or home-based projects, we help them find the right job to suit their needs.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-6 flex justify-center">
          <img src="/image/profile.jpg" alt="Job Opportunities" className="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300 object-cover"/>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center p-12 bg-blue-50 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 p-6 flex justify-center">
          <img src="/public/image/aboutus5.webp" alt="Our Vision" className="w-3/4 md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300 object-cover"/>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-4xl font-bold text-blue-600 mb-4 border-l-4 border-blue-400 pl-4 hover:text-blue-700 transition-all duration-300">
            Our Vision
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
            Our vision is to create a future where every woman in rural India has access to the skills, resources, and opportunities needed to achieve economic independence and empowerment.
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Aboutus
