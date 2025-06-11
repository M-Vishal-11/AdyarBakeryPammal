"use client";
import { useState } from "react";
import ExpandCollapseBtn from "../products/btn";
import ProductCategoryOffers from "./productCategoryOffers";

const Page = () => {
  const [expand, setExpand] = useState(true);

  return (
    <div>
      <div className="mb-[3vh]">
        <h1 className="text-[5vh] font-bold text-center mb-[1vh]">
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

export default Page;
