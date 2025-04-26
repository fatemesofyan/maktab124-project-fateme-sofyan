"use client";

import React from "react";

export default function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
  newProduct,
  setNewProduct,
  categories,
  filteredSubcategories,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[750px]">
        <h3 className="text-xl font-bold mb-4">افزودن محصول جدید</h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              نام محصول
            </label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="input"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              دسته‌بندی
            </label>
            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="input"
            >
              <option value="">انتخاب کنید...</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              زیردسته‌بندی
            </label>
            <select
              value={newProduct.subcategory}
              onChange={(e) =>
                setNewProduct({ ...newProduct, subcategory: e.target.value })
              }
              className="input"
            >
              <option value="">انتخاب کنید...</option>
              {filteredSubcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              توضیحات
            </label>
            <textarea
              value={newProduct.description || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="input"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              تعداد موجودی
            </label>
            <input
              type="number"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: e.target.value })
              }
              className="input"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              برند
            </label>
            <input
              type="text"
              value={newProduct.brand || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
              className="input"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              قیمت
            </label>
            <input
              type="text"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="input"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              تصویر
            </label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setNewProduct((prev) => ({ ...prev, image: file }));
              }}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="cancel-button">
              لغو
            </button>
            <button type="button" onClick={onSubmit} className="submit-button">
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
