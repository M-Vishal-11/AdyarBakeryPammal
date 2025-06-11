"use client";
import { useState } from "react";
import ExpandCollapseBtn from "../products/btn";
import ProductCategory from "@/app/functions/productcategory";
import ProductCategoryOffers from "./productCategoryOffers";

const page = () => {
  const [expand, setExpand] = useState(true);

  return (
    <div>
      <div className="mb-[3vh]">
        <h1 className="text-[5vh] font-bold text-center">
          Today&apos;s Offers %
        </h1>
        <hr className="border-t border-[#D9D9D9]" />
      </div>
      <ExpandCollapseBtn setExpand={setExpand} />
      <div>
        {/* Categories */}

        <ProductCategoryOffers open={expand} />
      </div>
    </div>
  );
};

export default page;
