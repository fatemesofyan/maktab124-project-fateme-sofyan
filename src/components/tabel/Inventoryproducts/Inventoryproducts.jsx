"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/components/loading/loading";
import Pagination from "@/components/pagination/pagination";
import {
  fetchPaginatedProducts,
  updateProduct,
} from "@/services/admin/dashboard";
import ProductInventoryTable from "./tabelsInventory";
import Swal from "sweetalert2";
import ProductFilterRadioGroup from "@/components/shared/input/productFilterRadio";

const ITEMS_PER_PAGE = 5;

export default function InventoryProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        let filterParams = {};
        if (filter === "existing") {
          filterParams.minQuantity = 1;
        } else if (filter === "non-existent") {
          filterParams.exactZero = true;
        }

        const data = await fetchPaginatedProducts({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          ...filterParams,
        });

        if (data.status === "success") {
          setProducts(data.data.products);
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setError(
          `خطا: ${error.message || "مشکلی در بارگذاری محصولات رخ داد."}`
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentPage, filter]);

  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const startEditing = (productId) => {
    const product = products.find((p) => p._id === productId);
    setEditingProductId(productId);
    setEditedProduct({ price: product.price, quantity: product.quantity });
  };

  const cancelEditing = () => {
    setEditingProductId(null);
    setEditedProduct({});
  };

  const saveChanges = async () => {
    try {
      const updated = await updateProduct(editingProductId, editedProduct);
      setProducts((prev) =>
        prev.map((p) => (p._id === editingProductId ? updated.data.product : p))
      );
      cancelEditing();

      await Swal.fire({
        title: "با موفقیت ذخیره شد!",
        icon: "success",
        confirmButtonText: "باشه 😊",
        allowOutsideClick: false,
        allowEscapeKey: true,
        allowEnterKey: true,
      });
    } catch (error) {
      console.error("Error saving changes:", error);
      await Swal.fire({
        title: "خطا!",
        text: "ذخیره تغییرات با مشکل مواجه شد.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-row justify-between">

      <h2 className="text-3xl font-bold text-primaryDark mb-8 text-start">
        مدیریت موجودی کالا
      </h2>

      <ProductFilterRadioGroup filter={filter} onChange={setFilter} />
      </div>

      <ProductInventoryTable
        products={products}
        editingProductId={editingProductId}
        editedProduct={editedProduct}
        onEditStart={startEditing}
        onEditCancel={cancelEditing}
        onEditSave={saveChanges}
        onFieldChange={setEditedProduct}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
