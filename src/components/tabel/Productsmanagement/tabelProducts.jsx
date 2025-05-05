"use client";

import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomDropdown from "../dropdown/dropdown";

export default function ProductTable({
  currentItems,
  handleCategorySelect,
  handleDeleteProduct,
  openEditModal,
}) {
  const getImageUrl = (img) => {
    if (!img) return 'http://localhost:8000/images/products/products-images-default.jpeg';
  
    if (img.startsWith('http') || img.startsWith('localhost')) {
      return img.startsWith('http') ? img : `http://${img}`;
    }
  
    return `http://localhost:8000/images/products/${img}`;
  };
  
  
  return (
    <div className="shadow-lg rounded-lg border border-gray-300 mt-6">
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-primaryDark text-white">
            <th className="py-4 px-8 text-right font-semibold w-1/8">تصویر</th>
            <th className="py-4 px-8 text-right font-semibold w-2/4">کالا</th>
            <th className="py-4 px-6 text-right font-semibold w-2/8">
            دسته بندی
            </th>
            <th className="py-4 px-6 text-right font-semibold w-1/8">تغییرات</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((product) => (
            <tr
              key={product._id}
              className="border-b border-gray-300 hover:bg-accent hover:text-white transition"
            >
      <td className="py-4 px-6 border-r border-gray-300">
  <img
    src={getImageUrl(product.images?.[0])}
    alt={product.name}
    className="w-16 h-16 object-cover rounded-md"
  />
</td>




              <td className="py-4 px-6 border-r border-gray-300">
                {product.name}
              </td>

              <td className="py-4 px-6 border-r border-gray-300">
                {product.category.name}
              </td>

              <td className="py-4 px-6 border-r border-gray-300 flex items-center justify-center gap-6">
                <button
                  className="text-primaryDark hover:text-blue-500 cursor-pointer"
                  title="ویرایش"
                  onClick={() => openEditModal(product)}
                >
                  <FaEdit size={18} />
                </button>

                <button
                  className="text-primaryDark hover:text-red-500 cursor-pointer"
                  title="حذف"
                  onClick={() => handleDeleteProduct(product._id)}

                >
                  <FaTrashAlt size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
