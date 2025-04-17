import React from 'react'


export default  function EditableField({ value, onChange }) {
    return (
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-1 rounded-md w-full"
      />
    );
  }