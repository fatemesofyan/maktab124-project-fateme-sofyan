// // app/main/products/[id]/page.jsx

// import React from 'react'

// const API_URL = `http://localhost:8000/api/products`;

// async function getProduct(id) {
//   const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
//   const data = await res.json();
//   return data.data;
// }

// export default async function SingleProductPage({ params }) {
//   const { id } = params;
//   const product = await getProduct(id);

//   return (
//     <div className="p-4">
//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="w-full md:w-1/2">
//           <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//           <span className="text-2xl font-bold text-green-600">
//             {product.price.toLocaleString()} تومان
//           </span>

//           <div className="mt-4">
//             <h3 className="text-lg font-semibold mb-2">رنگ:</h3>
//             <div className="flex gap-2">
//               <button className="w-6 h-6 bg-gray-300 rounded-full" title="خاکستری" />
//               <button className="w-6 h-6 bg-green-300 rounded-full" title="سبز" />
//               <button className="w-6 h-6 bg-orange-300 rounded-full" title="نارنجی" />
//             </div>
//           </div>

//           <div className="mt-4">
//             <button
//               type="button"
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"
//             >
//               اضافه به سبد خرید
//             </button>
//           </div>
//         </div>

//         <div className="w-full md:w-1/2">
//           <img
//             src={`http://localhost:8000/images/products/${product.images?.[0] || 'products-images-default.jpeg'}`}
//             alt={product.name}
//             className="w-full h-auto rounded-lg"
//           />
//         </div>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-2">توضیحات</h2>
//         <p>{product.description || "توضیحی ثبت نشده است."}</p>
//       </div>
//     </div>
//   );
// }
