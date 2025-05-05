import React, { useState, useEffect } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";

export default function CustomDropdown({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories");
        const data = await response.json();
        setCategories(data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="!text-primaryDark text-lg bg-white  border-2 border-primaryDark rounded-md w-24 h-12">
      <Dropdown label="دسته بندی" inline>
        {categories.map((category) => (
          <DropdownItem
            key={category._id}
            className="!text-primaryDark"
            onClick={() => onCategorySelect(category.slugname)} // انتخاب دسته‌بندی
          >
            {category.name}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
}