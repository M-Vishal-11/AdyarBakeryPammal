"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiTruck } from "react-icons/fi";
import ShopStatus from "../functions/admin-ShopStatus";
import AdminCategory from "../functions/admin-category";
import OffersBtn from "../(home)/offers/offersBtn";
import axios from "axios";
import Link from "next/link";

export default function AdminDashboard() {
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchShopStatus = async () => {
      try {
        const res = await axios.get("/api/shopOpenStatus/shopStatus");
        setIsShopOpen(res.data.shopStatus.isOpen);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShopStatus();
  }, []);

  useEffect(() => {
    const infoToEndPoint = async () => {
      try {
        await axios.put("/api/shopOpenStatus/updateShopOpen", {
          isShopOpen: isShopOpen,
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
      }
    };

    infoToEndPoint();
  }, [isShopOpen]);

  useEffect(() => {
    const extractCategories = async () => {
      const res = await axios.get("/api/productsDisplay/extractCategories");
      setCategories(res.data.categories);
    };
    extractCategories();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#ffebe6]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Admin Actions Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-1">
                Manage your shop products and settings
              </p>
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <Link
                href="/admin-dashboard/deliveryDetails"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <FiTruck className="h-5 w-5 mr-2" />
                Delivery Settings
              </Link>
              <Link
                href="/admin-dashboard/add-product"
                className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <FiPlus className="h-5 w-5 mr-2" />
                Add Product
              </Link>
            </div>
          </div>

          {/* Shop Status Card */}
          <div className="mb-8">
            <ShopStatus isShopOpen={isShopOpen} setIsShopOpen={setIsShopOpen} />
          </div>

          {/* Offers Section */}
          <div className="mb-8 flex justify-center">
            <OffersBtn expand={expand} setExpand={setExpand} />
          </div>

          {/* Products Section */}
          <div className="space-y-6">
            {categories.map((category, i) => (
              <AdminCategory key={i} category={category} expand={expand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
