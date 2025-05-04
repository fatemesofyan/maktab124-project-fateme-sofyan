// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { add, remove } from "@/redux/reducers/productReducer";

// export default function AddToCartController({ product }) {
//   const dispatch = useDispatch();
//   const productData = useSelector((state) => state.product);

//   if (!product || (!product._id && !product.id)) {
//     console.warn("Product is missing or malformed:", product);
//     return null;
//   }

//   const productId = product._id || product.id;
//   const found = productData?.find((item) => item.id === productId);
//   const count = found?.count || 0;
//   const isMaxReached = count >= product.quantity;

//   if (product.quantity === 0) {
//     return (
//       <div className="text-red-500 text-sm font-semibold px-2 py-1 border border-red-400 rounded">
//         اتمام موجودی
//       </div>
//     );
//   }

//   return (
//     <>
//       {count > 0 ? (
//         <div className="flex gap-3 border border-gray-400 p-1 rounded-xl bg-white">
//           <button
//             onClick={() => dispatch(add(product))}
//             className="px-2 text-lg disabled:text-gray-300"
//             disabled={isMaxReached}
//           >
//             +
//           </button>
//           <p className="px-1">{count}</p>
//           <button
//             onClick={() => dispatch(remove(product))}
//             className="px-2 text-lg"
//           >
//             -
//           </button>
//         </div>
//       ) : (
//         <div
//           className="border border-green-700 p-1 flex items-center gap-1 rounded-lg cursor-pointer hover:bg-green-100 transition-colors bg-white"
//           onClick={() => dispatch(add(product))}
//         >
//           <span className="text-xs">افزودن به سبد</span>
//           <img
//             className="h-6"
//             src="https://www.svgrepo.com/show/313120/cart.svg"
//             alt="Cart"
//           />
//         </div>
//       )}
//     </>
//   );
// }
