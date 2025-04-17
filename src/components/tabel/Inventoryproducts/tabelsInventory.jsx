"use client";

import EditableField from "@/components/shared/input/EditableField";

export default function ProductInventoryTable({
  products,
  editingProductId,
  editedProduct,
  onEditStart,
  onEditCancel,
  onEditSave,
  onFieldChange,
}) {
  return (
    <div className="shadow-lg rounded-lg border border-gray-300">
      <table className="w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-primaryDark text-white">
            <th className="py-4 px-8 text-right font-semibold w-2/4">کالا</th>
            <th className="py-4 px-6 text-right font-semibold w-1/8">قیمت</th>
            <th className="py-4 px-6 text-right font-semibold w-1/8">موجودی</th>
            <th className="py-4 px-6 text-right font-semibold w-1/8">
              تغییرات
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              className={`border-b border-gray-300 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-accent`}
            >
              <td className="py-4 px-6 border-r border-gray-300">
                {product.name}
              </td>
              <td className="py-4 px-6 border-r border-gray-300">
                {editingProductId === product._id ? (
                  <EditableField
                    value={editedProduct.price}
                    onChange={(e) =>
                      onFieldChange({ ...editedProduct, price: e.target.value })
                    }
                  />
                ) : (
                  product.price
                )}
              </td>
              <td className="py-4 px-6 border-r border-gray-300">
                {editingProductId === product._id ? (
                  <EditableField
                    value={editedProduct.quantity}
                    onChange={(e) =>
                      onFieldChange({
                        ...editedProduct,
                        quantity: e.target.value,
                      })
                    }
                  />
                ) : (
                  product.quantity
                )}
              </td>
              <td className="py-4 px-6 border-r border-gray-300">
                {editingProductId === product._id ? (
                  <>
                    <button
                      onClick={onEditSave}
                      className="text-green-500 mr-2"
                    >
                      ذخیره
                    </button>
                    <button onClick={onEditCancel} className="text-red-500">
                      لغو
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onEditStart(product._id)}
                    className="text-blue-500"
                  >
                    ویرایش
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
