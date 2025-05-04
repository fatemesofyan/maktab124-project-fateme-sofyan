"use client";

import React, { useEffect, useState } from 'react';
import { FiCreditCard, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { useRouter } from "next/navigation";



const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [baseAmount, setBaseAmount] = useState(0);
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
    if (!token || role !== 'USER') {
      // ذخیره مسیر قبلی تا بعد از لاگین برگرده به اینجا
      localStorage.setItem('redirectAfterLogin', '/checkout');
      router.push('/auth/login');
    }
  }, []);
  

  

  // گرفتن مبلغ از localStorage
  useEffect(() => {
    const storedAmount = localStorage.getItem("totalAmount");
    setBaseAmount(Number(storedAmount) || 0);
  }, []);

  // محاسبه مبلغ نهایی
  const finalAmount = paymentMethod === 'cash' ? baseAmount + 40000 : baseAmount;

  const handlePayment = (e) => {
    e.preventDefault();

    if (paymentMethod === 'card' && (!name || !cardNumber)) {
      alert("لطفاً اطلاعات کارت را کامل وارد کنید.");
      return;
    }

    setIsPaid(true);
    setTimeout(() => {
      alert('پرداخت موفقیت‌آمیز بود!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#e7e3d9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">صفحه پرداخت</h2>

          {/* جزئیات محصول */}
          <div className="mb-8">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-medium text-secondary">گیتا شاپ</h3>
                <p className="text-sm text-gray-500">از خرید شما سپاس‌گزاریم.</p>
              </div>
              <div className="text-gray-900 font-medium">
                {baseAmount.toLocaleString()} تومان
              </div>
            </div>
          </div>

          {/* روش پرداخت */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">روش پرداخت</h3>
            <div className="space-y-3">
              <div
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#375437] bg-[#e7e3d9]'
                    : 'border-gray-200'
                }`}
              >
                <FiCreditCard className="h-6 w-6 text-gray-500 mr-3" />
                <span className="text-gray-900">کارت بانکی</span>
                {paymentMethod === 'card' && (
                  <FiCheckCircle className="h-5 w-5 text-[#375437] ml-auto" />
                )}
              </div>

              <div
                onClick={() => setPaymentMethod('cash')}
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'border-[#375437] bg-[#e7e3d9]'
                    : 'border-gray-200'
                }`}
              >
                <FiTruck className="h-6 w-6 text-gray-500 mr-3" />
                <span className="text-gray-900">پرداخت در محل (افزایش ۴۰٬۰۰۰ تومان)</span>
                {paymentMethod === 'cash' && (
                  <FiCheckCircle className="h-5 w-5 text-[#375437] ml-auto" />
                )}
              </div>
            </div>
          </div>

          {/* فرم کارت بانکی */}
          {paymentMethod === 'card' && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">جزئیات کارت</h3>
              <form onSubmit={handlePayment}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام دارنده کارت
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#375437] focus:border-[#375437]"
                    placeholder="نام خود را وارد کنید"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    شماره کارت
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#375437] focus:border-[#375437]"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
              </form>
            </div>
          )}

          {/* مبلغ کل و دکمه پرداخت */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">مبلغ قابل پرداخت:</span>
              <span className="text-2xl font-bold text-[#375437]">
                {finalAmount.toLocaleString()} تومان
              </span>
            </div>

            <button
              onClick={handlePayment}
              disabled={paymentMethod === 'card' && (!name || !cardNumber)}
              className={`mt-6 w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                isPaid
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-[#375437] hover:bg-[#2a3f2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#375437]'
              }`}
            >
              {isPaid ? (
                <>
                  <FiCheckCircle className="h-5 w-5 mr-2" />
                  پرداخت موفق
                </>
              ) : (
                `پرداخت ${finalAmount.toLocaleString()} تومان`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
