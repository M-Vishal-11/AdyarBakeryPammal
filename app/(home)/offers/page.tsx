"use client";
import { useState } from "react";
import ExpandCollapseBtn from "../products/btn";
import ProductCategoryOffers from "./productCategoryOffers";

const Page = () => {
  const [expand, setExpand] = useState(true);

  return (
    <div className="px-4 pb-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-[4.5vh] sm:text-[5vh] font-extrabold text-[var(--top-color)] tracking-wide">
          Today&apos;s Offers <span className="text-red-500">%</span>
        </h1>
        <hr className="mt-2 border-t border-[#D9D9D9]" />
      </div>

      {/* Expand/Collapse Button */}
      <div className="mb-4 flex justify-center">
        <ExpandCollapseBtn setExpand={setExpand} />
      </div>

      {/* Product Categories */}
      <ProductCategoryOffers open={expand} />
    </div>
  );
};

export default Page;
