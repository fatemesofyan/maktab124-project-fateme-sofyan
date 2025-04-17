// components/order/OrderFilterRadioGroup.tsx
export default function OrderFilterRadioGroup({ filter, onChange }) {
    const options = [
      { id: "delivered", label: "سفارش های تحویل شده" },
      { id: "pending", label: "سفارش های در حال انتظار" },
      { id: "all", label: "همه سفارشات" },
    ];
  
    return (
      <div className="flex flex-row gap-8">
        {options.map(({ id, label }) => (
          <div key={id}>
            <label htmlFor={`${id}-orders`} className="text-primaryDark">
              {label}
            </label>
            <input
              type="radio"
              id={`${id}-orders`}
              name="order"
              checked={filter === id}
              onChange={() => onChange(id)}
            />
          </div>
        ))}
      </div>
    );
  }
  