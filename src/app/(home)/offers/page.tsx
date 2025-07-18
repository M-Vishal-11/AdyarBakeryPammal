"use client";
import { useState, useEffect } from "react";
import OffersBtn from "./offersBtn";
import UserShopStatus from "@/app/functions/UserShopStatus";
import axios from "axios";
import ProductCategory from "@/app/functions/productcategory";

const Page = () => {
  const [expand, setExpand] = useState(true);
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopStatus = async () => {
      try {
        const res = await axios.get("/api/shopOpenStatus/shopStatus");
        setIsShopOpen(res.data.shopStatus.isOpen);
      } catch (error) {
        console.error("Error fetching shop status:", error);
        setIsShopOpen(true);
      }
    };

    fetchShopStatus();
  }, []);

  useEffect(() => {
    const exportCategories = async () => {
      try {
        const res = await axios.get(
          "/api/productsDisplay/extractCategoriesOffers"
        );
        setCategories(res.data.categories);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
        } else {
          console.error("Unknown error:", error);
        }
      }
      setLoading(false);
    };
    exportCategories();
  }, []);

  if (!isShopOpen) {
    return <UserShopStatus />;
  }

  if (loading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>
          <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            Loading...
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="px-4 pb-6 max-w-6xl mx-auto">
      {/* Header with animated gradient */}
      <div className="mb-8 text-center">
        <div className="relative inline-block">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-[var(--top-color)] to-red-500 bg-clip-text text-transparent">
            Today&apos;s Offers{" "}
            <span className="text-red-500 animate-pulse">%</span>
          </h1>
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[var(--top-color)] to-red-500 rounded-full"></div>
        </div>
        <p className="mt-3 text-gray-600 text-lg">
          Don&apos;t miss out on these exclusive deals!
        </p>
      </div>

      {/* Expand/Collapse Button */}
      <div className="mb-6 flex justify-center">
        <OffersBtn expand={expand} setExpand={setExpand} />
      </div>

      {/* Product Categories */}
      <div className="transition-all duration-300 ease-in-out">
        {categories.map((category, i) => (
          <ProductCategory
            open={expand}
            category={category}
            key={i}
            offer={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
