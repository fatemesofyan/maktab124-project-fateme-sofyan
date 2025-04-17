// services/authService.js

export async function loginUser({ username, password }) {
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        return { success: false, error: 'نام کاربری یا رمز عبور اشتباه است.' };
      }
  
      const data = await response.json();
  
      const accessToken = data.token?.accessToken;
      const role = data.data?.user?.role;
  
      if (!accessToken || !role) {
        return { success: false, error: 'اطلاعات ناقص دریافت شد.' };
      }
  
      return { success: true, accessToken, role };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'خطایی در ورود پیش آمد.',
      };
    }
  }
  
  // services/auth.js

export const registerUser = async (formData) => {
  const response = await fetch("http://localhost:8000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "خطایی در ثبت‌نام رخ داده است.");
  }

  return response.json();
};

  