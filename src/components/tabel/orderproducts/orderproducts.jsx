"use client";

import React, { useState, useEffect } from "react";
import OrderModal from "@/components/modal/orderModal";
import Pagination from "@/components/pagination/pagination";
import OrderFilterRadioGroup from "@/components/shared/input/OrderFilterRadioGroup";
import OrderTable from "@/components/tabel/orderproducts/tabels";
import { fetchOrders, markOrderAsDelivered } from "@/services/admin/dashboard";

const ITEMS_PER_PAGE = 1;

export default function Ordermanagement() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        if (data.status === "success") setOrders(data.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    filter === "delivered"
      ? order.deliveryStatus
      : filter === "pending"
      ? !order.deliveryStatus
      : true
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const currentItems = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const handleDelivered = async (id) => {
    try {
      const result = await markOrderAsDelivered(id);
      if (result.status === "success") {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? { ...order, deliveryStatus: true } : order
          )
        );
        closeModal();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold text-primaryDark mb-8 text-start">
          مدیریت سفارشات
        </h2>
        <OrderFilterRadioGroup
          filter={filter}
          onChange={(val) => {
            setFilter(val);
            setCurrentPage(1);
          }}
        />
      </div>

      <OrderTable orders={currentItems} onShowDetails={openModal} />

      {isModalOpen && (
        <OrderModal
          order={selectedOrder}
          onClose={closeModal}
          onMarkAsDelivered={handleDelivered}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
