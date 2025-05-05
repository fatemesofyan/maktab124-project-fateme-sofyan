"use client"

import React, { useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import ROUTES from "@/components/routes/routing";
import { fetchProducts } from "@/services/admin/dashboard";
import Link from "next/link";

export default function ProductsHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const getImageUrl = (img) => {
    if (!img) return 'http://localhost:8000/images/products/products-images-default.jpeg';
  
    if (img.startsWith('http') || img.startsWith('localhost')) {
      return img.startsWith('http') ? img : `http://${img}`;
    }
  
    return `http://localhost:8000/images/products/${img}`;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (data?.data?.products) {
          setProducts(data.data.products);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleProduct = () => {
    router.push(ROUTES.PRODUCT);
  };
  
  return (
    <div>
    <div className="mt-20">
      <div 
        className="flex flex-row items-center gap-3 text-secondary cursor-pointer" 
        onClick={handleProduct}
      >
        <IoIosArrowRoundForward className="w-10 h-10" />
        <h3 className="text-2xl">محصولات</h3>
        <AiOutlineProduct className="w-10 h-10 text-secondary hover:text-secondary/80" />
      </div>
  
      <div className="grid grid-cols-4 gap-5 mt-10 m-5">
        {loading && (
          <p className="text-lg col-span-4 text-center">در حال بارگذاری...</p>
        )}
  
        {error && (
          <p className="text-red-500 col-span-4 text-center">خطا: {error}</p>
        )}
  
        {!loading && !error && products.length === 0 && (
          <p className="text-lg col-span-4 text-center">محصولی یافت نشد</p>
        )}
  
        {!loading && !error && products.slice(0, 4).map((product) => (
                   <Link href={`/main/products/${product._id}`} key={product._id}>
          
          <div 
            className="w-full h-[400px] rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
          >
            <img
              src={getImageUrl(product.images?.[0])}
              alt={product.name}
              width={260}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          </Link>

        ))}
      </div>
    </div>
  </div>
  );
}