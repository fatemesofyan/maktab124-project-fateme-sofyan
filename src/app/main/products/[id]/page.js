"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "@/redux/reducers/productReducer";
import Loading from "@/components/loading/loading";

const API_URL = `http://localhost:8000/api/products`;

const getImageUrl = (img) => {
  if (!img)
    return "http://localhost:8000/images/products/products-images-default.jpeg";

  if (img.startsWith("http") || img.startsWith("localhost")) {
    return img.startsWith("http") ? img : `http://${img}`;
  }

  return `http://localhost:8000/images/products/${img}`;
};

export default function Page({ params }) {
  const { id } = params;
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
      const data = await res.json();
      setProduct(data.data.product);
    } catch (err) {
      console.error("خطا:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading/>;
  }

  if (!product) {
    return <div className="p-8">محصول یافت نشد.</div>;
  }

  const inCart = productData.find((item) => String(item.id) === String(product._id));

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full space-y-4 mt-36">
          <h5 className="text-4xl font-bold text-gray-900 mb-2">
            {product.name}
          </h5>

          <div className="text-gray-700 space-y-1 pt-12">
            <p className="flex items-center">
              <span className="font-semibold w-24">دسته‌بندی:</span>
              <span className="px-3 py-1 bg-gray-50 rounded-md">
                {product.category?.name || "نامشخص"}
              </span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-24">زیر‌دسته:</span>
              <span className="px-3 py-1 bg-gray-50 rounded-md">
                {product.subcategory?.name || "نامشخص"}
              </span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-24">قیمت:</span>
              <span className="text-lg font-medium text-gray-900">
                {product.price?.toLocaleString()} <span className="text-sm">تومان</span>
              </span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-24">موجودی:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  product.quantity > 0
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {product.quantity > 0 ? `${product.quantity} عدد` : "ناموجود"}
              </span>
            </p>
          </div>

          <div className="pt-8">
            {inCart ? (
              <div className="flex gap-3 border border-gray-400 p-2 rounded-xl bg-white w-full justify-center">
                <button
                  className="px-3 text-lg disabled:text-gray-300"
                  onClick={() => dispatch(add(product))}
                  disabled={inCart.count >= product.quantity}
                >
                  +
                </button>
                <span className="text-lg">{inCart.count}</span>
                <button
                  className="px-3 text-lg"
                  onClick={() => dispatch(remove(product))}
                >
                  -
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 hover:scale-105 transition-all duration-300 w-full shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={() => dispatch(add(product))}
                disabled={product.quantity === 0}
              >
                {product.quantity > 0 ? "افزودن به سبد خرید" : "ناموجود"}
              </button>
            )}
          </div>
        </div>

        <div className="w-[994px] min-h-[490px] mt-10">
          <img
            src={getImageUrl(product.images?.[0])}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
          توضیحات محصول
        </h2>
        <p className="text-gray-700 leading-relaxed min-h-[120px]">
          {product.description || "توضیحی برای این محصول ثبت نشده است."}
        </p>
      </div>
    </div>
  );
}
