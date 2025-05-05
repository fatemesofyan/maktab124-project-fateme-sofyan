"use client";
import { loginUser } from "@/services/auth";
import { validateLoginForm } from "@/utils/validateLoginForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../loading/loading";
import ButtonForm from "../shared/button/buttonform";
import Input from "../shared/input/inputForm";
import { jwtDecode } from "jwt-decode";


export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form data
    const { isValid, errors } = validateLoginForm(formData);
    if (!isValid) {
      setError(Object.values(errors)[0]);
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginUser(formData);
      console.log("login result:", result);

      if (!result.success) {
        setError(result.error);
      } else {
        const token = result.accessToken;
        const decoded = jwtDecode(token); // 👈 decode مستقیم توکن

        // ذخیره در لوکال‌استوریج
        localStorage.setItem("token", token);
        localStorage.setItem("role", result.role);
        localStorage.setItem("username", formData.username);
        localStorage.setItem("userId", decoded.id); // 👈 از توکن گرفتیم
    
        
        
        router.push(result.role === "ADMIN" ? "/admin" : "/");
      }
    } catch (err) {
      setError(err.message || "خطایی در ورود پیش آمد.");
    } finally {
      setIsLoading(false);
    }
  };


     

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      {/* Backdrop for loading */}
      {isLoading && <Loading />}

      {/* Main content */}
      <div
        className={`bg-surface p-8 rounded-lg shadow-lg w-full max-w-md text-primaryDark ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          ورود به حساب کاربری
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Input
              id="username"
              label="نام کاربری"
              placeholder="نام کاربری خود را وارد کنید"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Input
              id="password"
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit button */}
          <ButtonForm type="submit">ورود</ButtonForm>
        </form>

        {/* Registration link */}
        <div className="mt-4 text-center">
          <a href="/auth/register" className="text-secondary ">
            ثبت‌نام نکرده‌اید؟
          </a>
        </div>
      </div>
    </div>
  );
}
