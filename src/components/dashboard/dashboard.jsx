"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardPie from "./chart/piechart";
import DashboardBar from "./chart/Barchart";

const AdminPage = () => {
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    checkAuth();
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  return (
    <div className="flex flex-row gap-12">
      <DashboardPie />
      <DashboardBar />
    </div>
  );
};

export default AdminPage;
