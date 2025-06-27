"use client";
import { useState, useEffect } from "react";
import ShopStatus from "../functions/admin-ShopStatus";
import AdminCategory from "../functions/admin-category";
import OffersBtn from "../(home)/offers/offersBtn";
import axios from "axios";

export default function AdminDashboard() {
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    const fetchShopStatus = async () => {
      try {
        const res = await axios.get("/api/shopOpenStatus/shopStatus");
        setIsShopOpen(res.data.shopStatus.isOpen);
      } catch (error: any) {
        console.error("Error fetching shop status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopStatus();
  }, []);

  useEffect(() => {
    const infoToEndPoint = async () => {
      try {
        const res = await axios.put("/api/shopOpenStatus/updateShopOpen", {
          isShopOpen: isShopOpen,
        });
      } catch (error: any) {
        console.error("Error sending data:", error);
      }
    };

    infoToEndPoint();
  }, [isShopOpen]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-200 border-t-blue-500"></div>
      </div>
    );
  }

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

          <div className="mb-6 flex justify-center">
            <OffersBtn expand={expand} setExpand={setExpand} />
          </div>

          {/* Products Section */}
          <AdminCategory category="Category1" expand={expand} />
        </div>
      </div>
    </div>
  );
}
