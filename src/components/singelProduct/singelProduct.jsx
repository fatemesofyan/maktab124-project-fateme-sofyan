"use client"
import React, { useState, useEffect } from 'react';
import { PiShoppingCartFill } from "react-icons/pi";

const API_URL = `http://localhost:8000/api/products/:id`; // URL برای دریافت محصول به صورت منحصر به فرد

export default function SingleProductPage({ match }) {
//   const [product, setProduct] = useState(null); // حالت برای ذخیره محصول
//   const [loading, setLoading] = useState(true); // حالت برای نمایش وضعیت بارگذاری
//   const [error, setError] = useState(null); // حالت برای نمایش خطاهای API

//   // استفاده از ID محصول از پارامتر URL
//   const productId = match.params.id;

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${API_URL.replace(':id', productId)}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch product');
//         }
//         const data = await response.json();
//         setProduct(data.data.product); // فرض کنید API یک محصول (object) برمی‌گرداند
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//         setError('مشکلی در دریافت محصول وجود دارد.');
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]); // فقط وقتی ID محصول تغییر کند، محصول بارگذاری شود

//   if (loading) {
//     return <div className="p-4">در حال بارگذاری...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-red-500">{error}</div>;
//   }

//   if (!product) {
//     return <div className="p-4">محصول یافت نشد.</div>;
//   }

  return (
    <div className="p-4">
      {/* بخش تصویر محصول */}
      <div className="flex flex-col md:flex-row gap-8">
       
        <div className="w-full md:w-1/2">
          {/* بخش جزئیات محصول */}
          <h1 className="text-2xl font-bold mb-2">ll</h1>
          <div className="flex items-center mb-2">
            {/* <span className="text-yellow-400 mr-2">
              {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
            </span> */}
            {/* <span className="text-gray-500 text-sm">
              ({product.rating}) - {product.reviewsCount} نظر
            </span> */}
          </div>
          <span className="text-2xl font-bold text-green-600">$22</span>

          {/* انتخاب رنگ و اندازه (اگر موجود) */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">رنگ:</h3>
            <div className="flex gap-2">
              <button
                className="w-6 h-6 bg-gray-300 rounded-full"
                title="آبی"
              ></button>
              <button
                className="w-6 h-6 bg-green-300 rounded-full"
                title="سبز"
              ></button>
              <button
                className="w-6 h-6 bg-orange-300 rounded-full"
                title="نارنجی"
              ></button>
            </div>
          </div>

          {/* دکمه‌های اضافه به سبد خرید و علاقه‌مندی */}
          <div className="mt-4">
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"
            >
              اضافه به سبد خرید
            </button>
           
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="http://localhost:8000/images/products/images/products-68091822bc3bb2aac05658e4-1745426466270-1.webp"
            alt="kk"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* بخش توضیحات محصول */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">توضیحات</h2>
        <p>jooo</p>
      </div>

      {/* بخش جدول مقایسه اندازه‌ها */}
      {/* <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">مقایسه اندازه‌ها</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">اندازه</th>
              <th className="border p-2">ارتفاع</th>
              <th className="border p-2">عرض</th>
              <th className="border p-2">عمق</th>
            </tr>
          </thead>
          <tbody>
            {product.sizes.map((size, index) => (
              <tr key={index}>
                <td className="border p-2">{size.name}</td>
                <td className="border p-2">{size.height} cm</td>
                <td className="border p-2">{size.width} cm</td>
                <td className="border p-2">{size.depth} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

 
    </div>
  );
}