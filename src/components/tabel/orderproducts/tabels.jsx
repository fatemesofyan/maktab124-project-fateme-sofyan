// components/order/OrderTable.tsx
export default function OrderTable({ orders, onShowDetails }) {
  return (
    <div className="shadow-lg rounded-lg border border-gray-300">
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-primaryDark text-white">
            <th className="py-4 px-8 text-right font-semibold">نام کاربر</th>
            <th className="py-4 px-8 text-right font-semibold">مجموع مبلغ</th>
            <th className="py-4 px-6 text-right font-semibold">وضعیت تحویل</th>
            <th className="py-4 px-6 text-right font-semibold">جزئیات</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order._id}
              className={`border-b border-gray-300 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-accent hover:text-white transition`}
            >
              <td className="py-4 px-6 border-r border-gray-300">
                {order.user.firstname} {order.user.lastname}
              </td>
              <td className="py-4 px-6 border-r border-gray-300">
                {order.totalPrice.toLocaleString()} تومان
              </td>
              <td className="py-4 px-6 border-r border-gray-300">
                {order.deliveryStatus ? "تحویل داده شده" : "در حال انتظار"}
              </td>
              <td className="py-4 px-6 border-r border-gray-300 flex justify-center">
                <button
                  className="text-blue-500 underline hover:text-blue-900"
                  onClick={() => onShowDetails(order)}
                >
                  جزئیات
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
