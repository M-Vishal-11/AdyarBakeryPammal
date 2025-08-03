"use client";
import { useEffect, useState } from "react";
import ProductCategory from "@/app/functions/productcategory";
import ExpandCollapseBtn from "./btn";
import axios from "axios";
import UserShopStatus from "@/app/functions/UserShopStatus";
import ProductCard from "@/app/functions/productcard";

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 21L15 15M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface Product {
  productName: string;
  price: number;
  discountedPrice?: number;
  descriptions: string[];
  available: boolean;
  imageUrl: string;
}

export default function Page() {
  const [expand, setExpand] = useState(true);
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

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
    const call = async () => {
      const res = await axios.post(
        "/api/productsDisplay/extractProductsSearch",
        { searchVal }
      );
      setProducts(res.data.productData);
    };
    call();
  }, [searchVal]);

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
      <div className="flex justify-center items-center mb-4 px-4">
        {/* Responsive Search Bar */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-1/2 xl:w-1/3">
          <input
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            value={searchVal}
            type="text"
            placeholder="Search products..."
            className="bg-white text-gray-800 p-3 rounded-full w-full pl-5 pr-12 focus:ring-2 focus:ring-[#FF6B6B] focus:outline-none transition-all duration-200 shadow-md hover:shadow-lg"
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#FF6B6B] p-2 rounded-full hover:bg-[#e05555] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FF6B6B]"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
      {!searchVal && (
        <div>
          <ExpandCollapseBtn setExpand={setExpand} />
          {categories.map((category, i) => (
            <ProductCategory open={expand} category={category} key={i} />
          ))}
        </div>
      )}
      {searchVal !== undefined && Array.isArray(products) && (
        <div className="p-6 pt-0">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard
                key={i}
                productName={product.productName}
                price={product.price}
                discountedPrice={product.discountedPrice}
                descriptions={product.descriptions}
                isAvailable={product.available}
                imageURL={product.imageUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
