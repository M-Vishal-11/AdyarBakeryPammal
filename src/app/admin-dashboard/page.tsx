"use client";
import { useState } from "react";
import Link from "next/link";
import AdminProductCard from "../functions/admin-productCard";
import { FiPlus, FiShoppingBag, FiSun, FiMoon } from "react-icons/fi";
import ShopStatus from "../functions/admin-ShopStatus";
import AdminCategory from "../functions/admin-category";

export default function AdminDashboard() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [expand, setExpand] = useState(true);

  return (
    <div className="min-h-screen bg-[#ffebe6]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your shop products and settings
            </p>
          </div>

          {/* Shop Status Card */}
          <ShopStatus isShopOpen={isShopOpen} setIsShopOpen={setIsShopOpen} />

          {/* Products Section */}
          <AdminCategory category="Category1" />
        </div>
      </div>
    </div>
  );
}
