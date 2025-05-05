"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "@/redux/reducers/productReducer";
import { useRouter } from "next/navigation";
import ROUTES from "../routes/routing";
import Loading from "../loading/loading";
import Link from "next/link";

const API_URL = "http://localhost:8000/api/products?page=1&limit=100";

const getImageUrl = (img) => {
  if (!img)
    return "http://localhost:8000/images/products/products-images-default.jpeg";

  if (img.startsWith("http") || img.startsWith("localhost")) {
    return img.startsWith("http") ? img : `http://${img}`;
  }

  return `http://localhost:8000/images/products/${img}`;
};

export default function CartPage() {
  const cartItems = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCartToProduct = () => {
    router.push(ROUTES.PRODUCT);
  };

  const handleCartToCheckout = () => {
    localStorage.setItem("totalAmount", totalPrice.toString());

    // ذخیره محصولات به شکل مورد نیاز برای Checkout
    const productsToStore = cartItems.map((item) => ({
      id: item.id,
      count: item.count,
    }));

    localStorage.setItem("product", JSON.stringify(productsToStore));

    router.push(ROUTES.CHECKOUT);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const mergedCart = cartItems.map((cartItem) => {
    const fullProduct = products.find(
      (p) => String(p._id) === String(cartItem.id)
    );
    return { ...fullProduct, count: cartItem.count };
  });

  const totalPrice = mergedCart.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);

  if (loading) {
    return <Loading />;
  }

  if (mergedCart.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">سبد خرید شما</h1>
        <p className="text-gray-500">سبد خرید شما خالی است.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">سبد خرید شما</h1>

      <div className="grid gap-4">
        {mergedCart.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <Link href={`/main/products/${item._id}`}>
              <div className="flex items-center gap-4">
                <img
                  src={getImageUrl(item.images?.[0])}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>
                    {item.price?.toLocaleString()} تومان × {item.count}
                  </p>
                </div>
              </div>
            </Link>
            <div className="flex gap-3 border border-gray-400 p-1 rounded-xl bg-white">
              <button
                className="px-2 text-lg disabled:text-gray-300"
                onClick={() => dispatch(add(item))}
                disabled={item.count >= item.quantity}
              >
                +
              </button>
              <span>{item.count}</span>
              <button
                className="px-2 text-lg"
                onClick={() => dispatch(remove(item))}
              >
                -
              </button>
            </div>
          </div>
        ))}

        {/* مجموع قیمت */}
        <div className="mt-6 border-t pt-4 text-xl font-bold flex justify-between items-center">
          <span>مبلغ کل سبد خرید:</span>
          <span>{totalPrice.toLocaleString()} تومان</span>
        </div>

        {/* دکمه‌ها */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
            onClick={handleCartToProduct}
          >
            ادامه خرید
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            onClick={handleCartToCheckout}
          >
            پرداخت
          </button>
        </div>
      </div>
    </div>
  );
}
