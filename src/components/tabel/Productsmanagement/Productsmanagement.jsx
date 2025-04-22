"use client";

import React, { useState, useEffect } from "react";
import ProductTable from "./tabelProducts";
import PaginationProduct from "@/components/pagination/paginationProduct";
import AddProductModal from "@/components/modal/addproductmodal";

const ITEMS_PER_PAGE = 2;

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
  const handleDeleteProduct = async (productId) => {
    try {
      console.log("🔍 Product ID to delete:", productId);
  
      const confirmDelete = window.confirm("آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟");
      if (!confirmDelete) return;
  
      const response = await fetch(`http://localhost:8000/api/products/${productId}`, {
        method: "DELETE",
      });
  
      console.log("📡 DELETE Response Status:", response.status);
  
      const responseData = await response.json();
      console.log("📦 DELETE Response Data:", responseData);
  
      if (response.ok) {
        // حذف از استیت
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        setFilteredProducts((prevFiltered) =>
          prevFiltered.filter((product) => product._id !== productId)
        );
  
        alert("✅ محصول با موفقیت حذف شد.");
      } else {
        console.error("❌ Failed to delete product:", responseData);
        alert(responseData.message || "خطایی در حذف محصول رخ داد.");
      }
    } catch (error) {
      console.error("❗ Error deleting product:", error);
      alert("خطایی در حذف محصول رخ داد.");
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
        <AddProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAddProduct}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          categories={categories}
          filteredSubcategories={filteredSubcategories}
        />
      )}

<ProductTable
  currentItems={currentItems}
  handleCategorySelect={handleCategorySelect}
  handleDeleteProduct={handleDeleteProduct} // ارسال تابع حذف
/>

      {/* پیجینگ */}
      <PaginationProduct
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
