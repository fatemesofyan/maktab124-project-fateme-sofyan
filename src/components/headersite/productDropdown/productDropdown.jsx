import React, { useEffect, useState, useRef } from "react";
import { fetchCategories } from "@/services/admin/dashboard";
import { useRouter, usePathname } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function ProductDropdown() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data?.data?.categories || []);
    };

    loadCategories();
  }, []);

  const handleSelect = (categoryId) => {
    const url = `/main/products?category=${categoryId}`;
    if (pathname === "/main/products") {
      router.push(url);
    } else {
      window.location.href = url;
    }
  };

  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-primaryDark font-medium flex flex-row items-center  "
      >
        محصولات
        <MdKeyboardArrowDown className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleSelect(category._id)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
