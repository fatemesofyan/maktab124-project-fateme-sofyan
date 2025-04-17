// components/OrderModal.js
import React from "react";

export default function OrderModal({ order, onClose, onMarkAsDelivered }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h3 className="text-2xl font-bold text-primaryDark mb-4">
          جزئیات سفارش
        </h3>
        <div className="space-y-4">
          <p>
            <strong>نام کاربر:</strong> {order.user.firstname}{" "}
            {order.user.lastname}
          </p>
          <p>
            <strong>تلفن:</strong> {order.user.phoneNumber}
          </p>
          <p>
            <strong>آدرس:</strong> {order.user.address}
          </p>
          <p>
            <strong>تاریخ تحویل:</strong>{" "}
            {new Date(order.deliveryDate).toLocaleDateString()}
          </p>
          <p>
            <strong>وضعیت تحویل:</strong>{" "}
            {order.deliveryStatus ? "تحویل داده شده" : "در حال انتظار"}
          </p>
          <h4 className="text-xl font-bold text-primaryDark mt-4">محصولات:</h4>
          <ul className="list-disc pl-6">
            {order.products.map((product, index) => (
              <li key={index}>
                {product.product.name} - {product.count} عدد -{" "}
                {product.product.price.toLocaleString()} تومان
              </li>
            ))}
          </ul>
          {!order.deliveryStatus && (
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              onClick={() => onMarkAsDelivered(order._id)}
            >
              تحویل داده شد
            </button>
          )}
        </div>
        <button
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          onClick={onClose}
        >
          بستن
        </button>
      </div>
    </div>
  );
}
