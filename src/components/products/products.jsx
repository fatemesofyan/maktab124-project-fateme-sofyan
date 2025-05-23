"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "../pagination/pagination";
import Loading from "../loading/loading";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "@/redux/reducers/productReducer";

const ITEMS_PER_PAGE = 10;
const API_URL = `http://localhost:8000/api/products`;
const CATEGORY_API_URL = `http://localhost:8000/api/categories`;

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState(null);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);

  console.log("productData", productData);

  const getImageUrl = (img) => {
    if (!img)
      return "http://localhost:8000/images/products/products-images-default.jpeg";

    if (img.startsWith("http") || img.startsWith("localhost")) {
      return img.startsWith("http") ? img : `http://${img}`;
    }

    return `http://localhost:8000/images/products/${img}`;
  };

  const fetchCategoryName = async (id) => {
    try {
      const res = await fetch(`${CATEGORY_API_URL}/${id}`);
      const data = await res.json();
      setCategoryName(data.data.name || "دسته ناشناس");
    } catch (error) {
      console.error("Error fetching category name:", error);
      setCategoryName("دسته ناشناس");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        fields: "-rating,-createdAt,-updatedAt,-__v",
        sort: "price",
        "quantity[gte]": 0,
      });

      if (categoryId) {
        queryParams.append("category", categoryId);
      }

      const response = await fetch(`${API_URL}?${queryParams.toString()}`);
      const data = await response.json();
      const fetchedProducts = data.data.products || [];

      setProducts(fetchedProducts);
      setTotalPages(
        Math.ceil((data.total || fetchedProducts.length) / ITEMS_PER_PAGE)
      );

      if (categoryId) {
        if (fetchedProducts.length > 0) {
          setCategoryName(fetchedProducts[0]?.category?.name || "دسته ناشناس");
        } else {
          await fetchCategoryName(categoryId);
        }
      } else {
        setCategoryName(null);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, categoryId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        {categoryId ? `گیاهان ${categoryName || ""}` : "همه گیاهان"}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">هیچ محصولی یافت نشد.</p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {products.map((product) => {
              const foundedProduct = productData.find(
                (item) => String(item.id) === String(product._id)
              );

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative"
                >
                  <Link href={`/main/products/${product._id}`}>
                    <div>
                      <img
                        className="min-h-90 w-full object-cover"
                        src={getImageUrl(product.images?.[0])}
                        alt={product.name}
                      />
                      <div className="p-5 pb-24">
                        <h5 className="text-xl font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h5>
                        <p className="text-lg flex gap-1 items-center text-gray-700">
                          {product.price?.toLocaleString()} <span>تومان</span>
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="absolute bottom-4 left-4">
                    {foundedProduct ? (
                      <div className="flex gap-3 border border-gray-400 p-1 rounded-xl bg-white">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(add(product));
                          }}
                          className="px-2 text-lg disabled:text-gray-300"
                          disabled={foundedProduct.count >= product.quantity}
                        >
                          +
                        </button>
                        <p className="px-1">{foundedProduct.count}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(remove(product));
                          }}
                          className="px-2 text-lg"
                        >
                          -
                        </button>
                      </div>
                    ) : product.quantity === 0 ? (
                      <div className="text-red-500 text-sm font-semibold px-2 py-1 border border-red-400 rounded">
                        اتمام موجودی
                      </div>
                    ) : (
                      <div
                        className="border border-green-700 p-1 flex items-center gap-1 rounded-lg cursor-pointer hover:bg-green-100 transition-colors bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(add(product));
                        }}
                      >
                        <span className="text-xs">افزودن به سبد</span>
                        <img
                          className="h-6"
                          src="https://www.svgrepo.com/show/313120/cart.svg"
                          alt="Cart"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

{
  /* <button
                  type="button"
                  className="absolute bottom-4 left-4 bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 transition"
                >
                  افزودن به سبد خرید
                </button> */
}
