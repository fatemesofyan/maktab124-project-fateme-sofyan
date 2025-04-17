// components/shared/Input.jsx
'use client';
import React from 'react';

const Input = ({ id, label, type = 'text', value, onChange, placeholder, required = false }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );
};

export default Input;
