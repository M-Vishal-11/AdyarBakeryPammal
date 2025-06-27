"use client";
import { useState, useEffect } from "react";
import ProductCategoryOffers from "./productCategoryOffers";
import OffersBtn from "./offersBtn";

const Page = () => {
  const [expand, setExpand] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

      {/* Expand/Collapse Button with better visual feedback */}
      <div className="mb-6 flex justify-center">
        <OffersBtn expand={expand} setExpand={setExpand} />
      </div>

      {/* Product Categories with subtle animation */}
      {isMounted && (
        <div className="transition-all duration-300 ease-in-out">
          <ProductCategoryOffers open={expand} />
        </div>
      )}
    </div>
  );
};

export default Page;
