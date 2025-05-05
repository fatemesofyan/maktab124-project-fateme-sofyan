// components/order/OrderFilterRadioGroup.tsx
export default function ProductFilterRadioGroup({ filter, onChange }) {
    const options = [
      { id: "existing", label: " موجود" },
      { id: "non-existent", label: "ناموجود" },
      { id: "all", label: "همه " },
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
  