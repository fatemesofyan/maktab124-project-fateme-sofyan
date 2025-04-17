import React, { useState, useEffect } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";

export default function SubcategoryDropdown({ categoryId, onSubcategorySelect }) {
  const [subcategories, setSubcategories] = useState([]);

  // دریافت زیردسته‌ها مربوط به دسته‌بندی انتخاب‌شده
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        if (categoryId) {
          const response = await fetch(`http://localhost:8000/api/subcategories?category=${categoryId}`);
          const data = await response.json();
          setSubcategories(data.data.subcategories);
        } else {
          setSubcategories([]); // اگر دسته‌بندی انتخاب نشده باشد، لیست زیردسته‌ها خالی شود
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  return (
    <div className="!text-white text-lg">
      <Dropdown label="زیردسته‌بندی" inline>
        {subcategories.map((subcategory) => (
          <DropdownItem
            key={subcategory._id}
            className="!text-primaryDark"
            onClick={() => onSubcategorySelect(subcategory.slugname)} // انتخاب زیردسته
          >
            {subcategory.name}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
}