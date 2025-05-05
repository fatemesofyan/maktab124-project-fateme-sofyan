"use client";

import React, { useState, useEffect } from "react";
import ProductTable from "./tabelProducts";
import PaginationProduct from "@/components/pagination/paginationProduct";
import AddProductModal from "@/components/modal/addproductmodal";
import Swal from "sweetalert2";
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

  const [editingProduct, setEditingProduct] = useState(null);

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
          `http://localhost:8000/api/products?page=${currentPage}&limit=${ITEMS_PER_PAGE}&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=0`
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
      setFilteredProducts(products); // Reset to all products
    } else {
      setSelectedCategory(categorySlug);
      const filtered = products.filter(
        (product) => product.category.slugname === categorySlug
      );
      setFilteredProducts(filtered); // Apply category filter
    }
    setCurrentPage(1); // Reset pagination to the first page
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openEditModal = (product) => {
    console.log("Editing Product:", product);
    setEditingProduct(product);
    setNewProduct({
      name: product.name || "",
      category: product.category?._id || "",
      subcategory: product.subcategory?._id || "",
      image: null,
      price: product.price || 0,
      quantity: product.quantity || 0,
      description: product.description || "",
      brand: product.brand || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewProduct({
      name: "",
      category: "",
      subcategory: "",
      image: null,
      price: 0,
      quantity: 0,
      description: "",
      brand: "",
    });
    setEditingProduct(null);
  };
  useEffect(() => {
    console.log("AddProductModal Re-rendered with newProduct:", newProduct);
  }, [newProduct]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setCurrentItems(filteredProducts);
  }, [filteredProducts]);
  useEffect(() => {
    console.log("Updated newProduct state:", newProduct);
  }, [newProduct]);
  const handleAddProduct = async () => {
    try {
      const isDuplicate = products.some(
        (product) =>
          product.name.toLowerCase() === newProduct.name.toLowerCase()
      );
      if (isDuplicate) {
        await Swal.fire({
          icon: "warning",
          title: "نام تکراری!",
          text: "این نام محصول قبلاً ثبت شده است. لطفاً نام دیگری انتخاب کنید.",
          confirmButtonText: "باشه",
        });
        return;
      }

      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("category", newProduct.category);
      formData.append("subcategory", newProduct.subcategory);
      formData.append("images", newProduct.image); // این خط رو اضافه کن
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

        await Swal.fire({
          title: "محصول با موفقیت اضافه شد!",
          icon: "success",
          draggable: true, // توجه: SweetAlert2 به‌طور رسمی از draggable پشتیبانی نمی‌کنه، این صرفاً برای افکت دلخواه شما بود
          confirmButtonText: "باشه",
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to add product:", errorData);
        await Swal.fire({
          icon: "error",
          title: "اوه نه...",
          text: errorData.message || "خطایی در افزودن محصول رخ داد.",
          confirmButtonText: "باشه",
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      await Swal.fire({
        icon: "error",
        title: "اوه نه...",
        text: "خطایی در افزودن محصول رخ داد.",
        confirmButtonText: "باشه",
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      console.log("🔍 Product ID to delete:", productId);

      const result = await Swal.fire({
        title: "آیا مطمئن هستید؟",
        text: "شما دیگر نمی‌توانید این عمل را بازگردانید!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله، حذف شود!",
        cancelButtonText: "لغو",
      });

      if (!result.isConfirmed) return;

      const response = await fetch(
        `http://localhost:8000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      console.log("📡 DELETE Response Status:", response.status);

      const responseData = await response.json();
      console.log("📦 DELETE Response Data:", responseData);

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        setFilteredProducts((prevFiltered) =>
          prevFiltered.filter((product) => product._id !== productId)
        );

        await Swal.fire({
          title: "حذف شد!",
          text: "محصول با موفقیت حذف شد.",
          icon: "success",
          confirmButtonText: "باشه",
        });
      } else {
        console.error("❌ Failed to delete product:", responseData);
        Swal.fire({
          title: "خطا!",
          text: responseData.message || "خطایی در حذف محصول رخ داد.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    } catch (error) {
      console.error("❗ Error deleting product:", error);
      Swal.fire({
        title: "خطا!",
        text: "خطایی در حذف محصول رخ داد.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const handleEditProduct = async () => {
    try {
      if (!editingProduct) return;

      // تبدیل category و subcategory به شناسه
      const categoryId =
        typeof newProduct.category === "object"
          ? newProduct.category._id
          : newProduct.category;

      const subcategoryId =
        typeof newProduct.subcategory === "object"
          ? newProduct.subcategory._id
          : newProduct.subcategory;

      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("category", categoryId); // فقط شناسه ارسال شود
      formData.append("subcategory", subcategoryId); // فقط شناسه ارسال شود
      formData.append("images", newProduct.image); // این خط رو اضافه کن

      formData.append("price", newProduct.price);
      formData.append("quantity", newProduct.quantity);
      formData.append("description", newProduct.description || "");
      formData.append("brand", newProduct.brand || "");

      // چاپ مقادیر FormData برای تأیید
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await fetch(
        `http://localhost:8000/api/products/${editingProduct._id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        const updatedProduct = updatedData.data.product;

        // بروزرسانی لیست محصولات
        const updatedProducts = products.map((product) =>
          product._id === editingProduct._id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        setEditingProduct(null);
        closeModal();

        await Swal.fire({
          icon: "success",
          title: "محصول با موفقیت ویرایش شد!",
          confirmButtonText: "باشه",
        });
      } else {
        const errorData = await response.json();
        await Swal.fire({
          icon: "error",
          title: "خطا در ویرایش",
          text: errorData.message || "مشکلی در ویرایش محصول رخ داده.",
        });
      }
    } catch (error) {
      console.error("Error editing product:", error);
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی هنگام ویرایش محصول رخ داد.",
      });
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold text-primaryDark mb-8 text-start">
          مدیریت محصولات
        </h2>
        <div className="flex flex-row">
          <button
            onClick={openModal}
            className="text-white bg-primaryDark rounded-md w-24 h-12 shadow-lg border-2 border-gray-300 hover:bg-accent"
          >
            افزودن کالا
          </button>
          <CustomDropdown onCategorySelect={handleCategorySelect} />
        </div>
      </div>
      {isModalOpen && (
        <AddProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          categories={categories}
          filteredSubcategories={filteredSubcategories}
          isEditing={!!editingProduct}
        />
      )}

      <ProductTable
        currentItems={currentItems}
        handleCategorySelect={handleCategorySelect}
        handleDeleteProduct={handleDeleteProduct} // ارسال تابع حذف
        openEditModal={openEditModal}
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
