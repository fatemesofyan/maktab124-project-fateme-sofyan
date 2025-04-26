// components/shared/Button.jsx
'use client';
import React from 'react';

const ButtonForm = ({ children, type = 'button', onClick, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 hover:text-lg transition duration-300"
    >
      {children}
    </button>
  );
};

export default ButtonForm;
