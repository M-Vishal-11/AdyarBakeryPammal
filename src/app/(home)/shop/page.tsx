"use client";
import { useEffect, useState } from "react";
import ProductCategory from "@/app/functions/productcategory";
import ExpandCollapseBtn from "./btn";
import axios from "axios";
import UserShopStatus from "@/app/functions/UserShopStatus";

export default function Page() {
  const [expand, setExpand] = useState(true);
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopStatus = async () => {
      try {
        const res = await axios.get("/api/shopOpenStatus/shopStatus");
        setIsShopOpen(res.data.shopStatus.isOpen);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Unknown error", error);
        }
        setIsShopOpen(true);
      }
    };

    fetchShopStatus();
  }, []);

  useEffect(() => {
    const exportCategories = async () => {
      try {
        const res = await axios.get("/api/productsDisplay/extractCategories");
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
    return (
      <>
        <UserShopStatus />
      </>
    );
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
    <div>
      <ExpandCollapseBtn setExpand={setExpand} />
      <div>
        {categories.map((category, i) => (
          <ProductCategory open={expand} category={category} key={i} />
        ))}
      </div>
    </div>
  );
}
