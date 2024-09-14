import React from 'react'

function NormalCard() {
  return (
    <>
    <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src="https://img.freepik.com/free-photo/make-up-making_144627-13739.jpg?t=st=1726341860~exp=1726345460~hmac=5cd1321daae466e77ee33518d8b0658a09e483f55375feffc7e45562300803f6&w=740"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      Makeup
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Fashion</div>
      <div className="badge badge-outline">Products</div>
    </div>
  </div>
</div>
    </>
  )
}

export default NormalCard
