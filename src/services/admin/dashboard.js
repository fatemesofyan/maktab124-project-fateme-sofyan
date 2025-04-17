import { BASE_URL } from "@/api/url";


export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

// دریافت همه محصولات (برای دراپ‌دان و ...)
export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products?page=1&limit=100`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

// دریافت محصولات با صفحه‌بندی و فیلتر
export const fetchPaginatedProducts = async ({ page = 1, limit = 10, minQuantity = 0 } = {}) => {
  const query = `page=${page}&limit=${limit}&fields=-rating,-createdAt,-updatedAt,-__v&sort=price&quantity[gte]=${minQuantity}`;
  const response = await fetch(`${BASE_URL}/products?${query}`);
  if (!response.ok) throw new Error("Failed to fetch paginated products");
  return response.json();
};

// به‌روزرسانی محصول
export const updateProduct = async (id, data) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

export const fetchOrders = async () => {
  const response = await fetch("http://localhost:8000/api/orders");
  const data = await response.json();
  return data;
};

export const markOrderAsDelivered = async (orderId) => {
  const response = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deliveryStatus: true }),
  });

  return await response.json();
};


// زیردسته‌ها
export const fetchSubcategories = async () => {
  const response = await fetch(`${BASE_URL}/subcategories`);
  if (!response.ok) throw new Error("Failed to fetch subcategories");
  return response.json();
};


// افزودن محصول جدید
export const addProduct = async (formData) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: formData,
  });
  return response;
};
