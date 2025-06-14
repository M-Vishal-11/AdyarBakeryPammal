"use client";
import { useState, useEffect } from "react";
import ProductCategoryOffers from "./productCategoryOffers";

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
        <button
          onClick={() => setExpand(!expand)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--top-color)] text-white hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          <span className="font-medium">
            {expand ? "Collapse All" : "Expand All"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform duration-200 ${
              expand ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
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
