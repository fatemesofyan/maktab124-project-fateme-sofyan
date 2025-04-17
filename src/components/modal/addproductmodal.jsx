// components/AddProductModal.js

import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AddProductModal = ({
  isModalOpen,
  closeModal,
  newProduct,
  setNewProduct,
  handleAddProduct,
  categories,
  subcategories,
  filteredSubcategories,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[750px] h-auto">
        <h3 className="text-xl font-bold mb-4">افزودن محصول جدید</h3>
        <form>
          {/* فیلد نام محصول */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">نام محصول</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryDark focus:border-primaryDark sm:text-sm"
            />
          </div>

          {/* فیلد دسته‌بندی */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">دسته‌بندی</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryDark focus:border-primaryDark sm:text-sm"
            >
              <option value="">انتخاب کنید...</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* فیلد زیردسته‌بندی */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">زیردسته‌بندی</label>
            <select
              value={newProduct.subcategory}
              onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryDark focus:border-primaryDark sm:text-sm"
            >
              <option value="">انتخاب کنید...</option>
              {filteredSubcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* فیلد تصویر */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">تصویر</label>
            <input
              type="file"
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primaryDark file:text-white hover:file:bg-accent"
            />
          </div>

          {/* دکمه‌های مدال */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryDark"
            >
              لغو
            </button>
            <button
              type="button"
              onClick={handleAddProduct}
              className="px-4 py-2 text-sm font-medium text-white bg-primaryDark border border-transparent rounded-md shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryDark"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;