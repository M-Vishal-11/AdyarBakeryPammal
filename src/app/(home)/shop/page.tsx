"use client";
import { useEffect, useState } from "react";
import ProductCategory from "@/app/functions/productcategory";
import ExpandCollapseBtn from "./btn";
import axios from "axios";
import UserShopStatus from "@/app/functions/UserShopStatus";

export default function Page() {
  const [expand, setExpand] = useState(true);
  const [isShopOpen, setIsShopOpen] = useState(true);

  useEffect(() => {
    const fetchShopStatus = async () => {
      try {
        const res = await axios.get("/api/shopOpenStatus/shopStatus");
        setIsShopOpen(res.data.shopStatus.isOpen);
      } catch (error: any) {
        console.error("Error fetching shop status:", error);
      }
    };

    fetchShopStatus();
  }, []);

  if (!isShopOpen) {
    return (
      <>
        <UserShopStatus />
      </>
    );
  }

  return (
    <div>
      <ExpandCollapseBtn setExpand={setExpand} />
      <div>
        <ProductCategory open={expand} category="Category I" />
        <ProductCategory open={expand} category="Category II" />
      </div>
    </div>
  );
}
