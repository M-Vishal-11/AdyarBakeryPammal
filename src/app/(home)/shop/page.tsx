"use client";
import { useEffect, useState } from "react";
import ProductCategory from "@/app/functions/productcategory";
import ExpandCollapseBtn from "./btn";
import axios from "axios";
import UserShopStatus from "@/app/functions/UserShopStatus";
import ProductCard from "@/app/functions/productcard";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import useSWR from "swr";

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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Page() {
  const [expand, setExpand] = useState(true);
  const [isShopOpen, setIsShopOpen] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const { data, error, isLoading } = useSWR(
    "/api/productsDisplay/extractCategories",
    fetcher
  );

  const categories: string[] = data?.categories ?? [];

  if (error) return <p>Error loading categories</p>;

  useEffect(() => {
    const toastId = "loading-categories";
    if (isLoading) {
      toast.loading("Almost there... 🚀", { id: toastId });
    } else {
      toast.dismiss(toastId);
    }
  }, [isLoading]);

  useEffect(() => {
    const fetchProducts = debounce(async () => {
      if (!searchVal) return setProducts([]);
      const res = await axios.post(
        "/api/productsDisplay/extractProductsSearch",
        { searchVal }
      );
      setProducts(res.data.productData);
    }, 300);
    fetchProducts();

    return () => fetchProducts.cancel();
  }, [searchVal]);

  //Shop status
  const { data: status } = useSWR("/api/shopOpenStatus/shopStatus", fetcher);

  useEffect(() => {
    if (status?.shopStatus?.isOpen !== undefined) {
      setIsShopOpen(status.shopStatus.isOpen);
    }
  }, [status]);

  if (!isShopOpen) {
    return (
      <>
        <UserShopStatus />
      </>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center mb-4 px-4">
        {/* Responsive Search Bar */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-1/2 xl:w-1/3 h-12">
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
      {isLoading && (
        <div className="mb-[90vh] mt-10">
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
