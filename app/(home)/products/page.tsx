"use client";
import { useState } from "react";
import ProductCategory from "@/app/functions/productcategory";
import ExpandCollapseBtn from "./btn";

export default function Page() {
  const [expand, setExpand] = useState(true);

  return (
    <div>
      <ExpandCollapseBtn setExpand={setExpand} />
      <div>
        {/* Categories */}

        <ProductCategory open={expand} />
        <ProductCategory open={expand} />
      </div>
    </div>
  );
}
