"use client";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../loading/loading";
import ButtonForm from "../shared/button/buttonform";
import Input from "../shared/input/inputForm";

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await registerUser(formData);
      localStorage.setItem("username", formData.username);
      console.log("ثبت‌نام موفق:", data);
      router.push("/auth/login");
    } catch (err) {
      setError(err.message || "خطایی در ثبت‌نام رخ داده است.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {isLoading && <Loading />}
      {/* Main content */}
      <div className="bg-surface p-8 rounded-lg shadow-lg w-full max-w-md text-primaryDark">
        <h2 className="text-2xl font-bold text-center mb-6">ثبت‌نام</h2>

        {/* form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="firstname"
            label="نام"
            placeholder="نام خود را وارد کنید"
            value={formData.firstname}
            onChange={handleChange}
            required
          />

          <Input
            id="lastname"
            label="نام خانوادگی"
            placeholder="نام خانوادگی خود را وارد کنید"
            value={formData.lastname}
            onChange={handleChange}
            required
          />

          <Input
            id="username"
            label="نام کاربری"
            placeholder="نام کاربری خود را وارد کنید"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <Input
            id="password"
            label="رمز عبور"
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            id="phoneNumber"
            label="شماره تماس"
            placeholder="شماره تماس خود را وارد کنید"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <Input
            id="address"
            label="آدرس"
            placeholder="آدرس خود را وارد کنید"
            value={formData.address}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <ButtonForm type="submit" disabled={isLoading}>
            {isLoading ? "در حال ثبت‌نام..." : "ثبت نام"}
          </ButtonForm>
        </form>

        {/*  login */}
        <div className="mt-4 text-center">
          <a href="/auth/login" className="text-secondary">
            قبلاً ثبت‌نام کرده‌اید؟ وارد شوید
          </a>
        </div>
      </div>
    </div>
  );
}
