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

  if (!isShopOpen) {
    return <UserShopStatus />;
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

      {loading && (
        <div className="mb-[90vh] mt-15">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <details className="group" open>
              <summary className="flex justify-between items-center p-6 cursor-pointer bg-gradient-to-r from-orange-100 to-orange-200 mb-3">
                <div className="flex items-center">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </summary>

              <div className="p-6 pt-0">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <article className="relative rounded-xl shadow-md overflow-hidden bg-gray-100">
                    <div className="flex flex-col h-full">
                      {/* Product Image Placeholder */}
                      <div className="relative h-48 w-full bg-gray-200 animate-pulse" />

                      {/* Product Info Placeholder */}
                      <div className="p-4 flex-grow space-y-3">
                        {/* Product Name */}
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />

                        {/* Price */}
                        <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />

                        {/* Description lines */}
                        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse" />
                      </div>

                      {/* Add to Cart Button Placeholder */}
                      <div className="px-4 pb-4">
                        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </details>
          </div>
        </div>
      )}

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
