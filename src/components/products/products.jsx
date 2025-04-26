"use client"

import React, { useState, useEffect } from 'react';
import { PiShoppingCartFill } from "react-icons/pi";

const ITEMS_PER_PAGE = 10; // تعداد آیتم‌های نمایش داده‌شده در هر صفحه
const API_URL = `http://localhost:8000/api/products`;

export default function ProductCard() {
  const [products, setProducts] = useState([]); // حالت برای ذخیره محصولات
  const [currentPage, setCurrentPage] = useState(1); // حالت برای مدیریت صفحه فعلی
  const [loading, setLoading] = useState(true); // حالت برای نمایش وضعیت بارگذاری
  const getImageUrl = (img) => {
    if (!img) return 'http://localhost:8000/images/products/products-images-default.jpeg';
  
    if (img.startsWith('http') || img.startsWith('localhost')) {
      return img.startsWith('http') ? img : `http://${img}`;
    }
  
    return `http://localhost:8000/images/products/${img}`;
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}?page=${currentPage}&limit=${ITEMS_PER_PAGE}&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=0`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.data.products); // محصولات از فیلد `data.products` استخراج می‌شوند
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // در صورت تغییر صفحه، محصولات جدید بارگذاری می‌شوند

  if (loading) {
    return <div className="p-4">در حال بارگذاری...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">سانسوریا</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="w-full max-w-sm bg-white rounded-lg shadow-md relative">
            <img
              className="rounded-t-lg h-48 w-full object-cover"
              src={getImageUrl(product.images?.[0])}
              alt={product.name}
            />
            <div className="p-5 pb-16">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h5>
              <span className="text-2xl font-bold text-green-600">${product.price}</span>
              <div className="mt-2 mb-5">
                <span className="ml-2 text-sm font-medium text-gray-500">
                  موجودی: {product.quantity}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              اضافه به سبد خرید
            </button>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l"
        >
          قبلی
        </button>
        <span className="px-4 py-2 bg-gray-200 text-gray-700">
          صفحه {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}