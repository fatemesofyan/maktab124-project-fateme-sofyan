"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomDropdown from "../dropdown/dropdown";

const ITEMS_PER_PAGE = 5;

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);

  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/subcategories");
        const data = await response.json();
        setSubcategories(data.data.subcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (newProduct.category) {
      const filtered = subcategories.filter(
        (subcategory) => subcategory.category === newProduct.category
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [newProduct.category, subcategories]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products?page=${currentPage}&limit=${ITEMS_PER_PAGE}&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=8`
        );
        const data = await response.json();
        setProducts(data.data.products);
        setFilteredProducts(data.data.products);
        setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories");
        const data = await response.json();
        setCategories(data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (categorySlug) => {
    if (categorySlug === selectedCategory) {
      setSelectedCategory(null);
      setFilteredProducts(products);
    } else {
      setSelectedCategory(categorySlug);
      const filtered = products.filter(
        (product) => product.category.slugname === categorySlug
      );
      setFilteredProducts(filtered);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = () => {
    const visiblePages = [];
    const halfRange = Math.floor(5 / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewProduct({ name: "", category: "", image: null });
  };
  useEffect(() => {
    setCurrentItems(filteredProducts);
  }, [filteredProducts]);

  const handleAddProduct = async () => {
    try {
      const isDuplicate = products.some(
        (product) =>
          product.name.toLowerCase() === newProduct.name.toLowerCase()
      );
      if (isDuplicate) {
        alert("این نام محصول قبلاً ثبت شده است. لطفاً نام دیگری انتخاب کنید.");
        return;
      }

      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("category", newProduct.category);
      formData.append("subcategory", newProduct.subcategory);
      formData.append("thumbnail", newProduct.image);
      formData.append("price", newProduct.price);
      formData.append("quantity", newProduct.quantity);
      formData.append("description", newProduct.description || "");
      formData.append("brand", newProduct.brand || "");

      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        body: formData,
      });
      console.log("response.ok:", response.ok);

      if (response.ok) {
        const newProductData = await response.json();
        const category = categories.find(
          (cat) => cat._id === newProduct.category
        );
        const updatedProduct = {
          ...newProductData.data.product,
          category: category || { name: "بدون دسته‌بندی" },
        };

        if (currentItems.length < ITEMS_PER_PAGE) {
          setProducts((prevProducts) => [updatedProduct, ...prevProducts]);
          setFilteredProducts((prevFiltered) => [
            updatedProduct,
            ...prevFiltered,
          ]);
        } else {
          setCurrentPage((prevPage) => prevPage + 1);

          setProducts((prevProducts) => [updatedProduct, ...prevProducts]);
          setFilteredProducts((prevFiltered) => [
            updatedProduct,
            ...prevFiltered,
          ]);
        }

        closeModal();
      } else {
        const errorData = await response.json();
        console.error("Failed to add product:", errorData);
        alert(errorData.message || "خطایی در افزودن محصول رخ داد.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("خطایی در افزودن محصول رخ داد.");
    }
  };
  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold text-primaryDark mb-8 text-start">
          مدیریت محصولات
        </h2>
        <button
          onClick={openModal}
          className="text-white bg-primaryDark rounded-md w-24 h-12 shadow-lg border-2 border-gray-300 hover:bg-accent"
        >
          افزودن کالا
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[750px]  h-">
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryDark focus:border-primaryDark sm:text-sm"
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

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  زیردسته‌بندی
                </label>
                <select
                  value={newProduct.subcategory}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      subcategory: e.target.value,
                    })
                  }
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  توضیحات
                </label>
                <textarea
                  value={newProduct.description || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryDark focus:border-primaryDark sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="تعداد موجودی"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryDark focus:border-primaryDark sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  قیمت
                </label>
                <input
                  type="number"
                  value={newProduct.price || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryDark focus:border-primaryDark sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  تصویر
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.files[0] })
                  }
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primaryDark file:text-white hover:file:bg-accent"
                />
              </div>
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
      )}

      <div className="shadow-lg rounded-lg border border-gray-300">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-primaryDark text-white">
              <th className="py-4 px-8 text-right font-semibold w-1/8">
                تصویر
              </th>
              <th className="py-4 px-8 text-right font-semibold w-2/4">کالا</th>
              <th className="py-4 px-6 text-right font-semibold w-2/8">
                <CustomDropdown onCategorySelect={handleCategorySelect} />
              </th>
              <th className="py-4 px-6 text-right font-semibold w-1/8">
                تغییرات
              </th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((product) => (
              <tr
                key={product._id}
                className={`border-b border-gray-300 hover:bg-accent hover:text-white transition`}
              >
                <td className="py-4 px-6 border-r border-gray-300">
                  <img
                    src={`http://localhost:8000/${product.thumbnail}`}
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
                  >
                    <FaEdit size={18} />
                  </button>

                  <button
                    className="text-primaryDark hover:text-red-500 cursor-pointer"
                    title="حذف"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* پیجینگ */}
      <div className="flex justify-center mt-6 overflow-x-auto">
        <ul className="flex items-center gap-3">
          <li
            className={`px-3 py-1 rounded-md cursor-pointer ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-primaryDark hover:bg-gray-300"
            } transition`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            قبلی
          </li>

          {getVisiblePages().map((page) => (
            <li
              key={page}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                currentPage === page
                  ? "bg-primaryDark text-white"
                  : "bg-gray-200 text-primaryDark hover:bg-gray-300"
              } transition`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </li>
          ))}

          <li
            className={`px-3 py-1 rounded-md cursor-pointer ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-primaryDark hover:bg-gray-300"
            } transition`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            بعدی
          </li>
        </ul>
      </div>
    </div>
  );
}
