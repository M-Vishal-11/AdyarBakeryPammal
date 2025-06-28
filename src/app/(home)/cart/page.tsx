"use client";
import ProductCard from "@/app/functions/productcard";
import BuyNowlg from "./functions/buynowlg";
import BuyNowPhone from "./functions/buynowphone";
import InvoiceSummary from "@/components/helperFunctions/InvoiceSummary";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [products, setProducts] = useState<any[]>([]);
  const [cartData, setCartData] = useState<Record<string, number>>({});

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/cart/getCookies");
        const cart = res.data.cartCookies;
        setCartData(cart);
        const productNames = Object.keys(cart);

        const res2 = await axios.post(
          "/api/productsDisplay/extractProductsCart",
          {
            productNames,
          }
        );
        setProducts(res2.data.productData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="p-4 lg:p-8 bg-[#FFF9F7] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#333] mb-2">
          Your Shopping Cart
        </h1>
        <hr className="border-t border-[#E8E8E8] my-4" />

        <div className="lg:grid lg:grid-cols-2 lg:gap-10">
          {/* Left: Product List + Cart Summary */}
          <div>
            <div className="flex flex-col gap-5">
              {products.map((product, i) => (
                <ProductCard
                  key={i}
                  productName={product.productName}
                  price={product.price}
                  discountedPrice={product.discountedPrice}
                  descriptions={product.descriptions}
                  isAvailable={product.available}
                  imageURL={product.imageUrl}
                  qnty={cartData[product.productName] ?? 0}
                />
              ))}
            </div>

            {/* Cart Total */}
            <div className="mt-8 rounded-xl bg-white border border-[#FFD5C8] text-lg font-semibold flex justify-between px-6 py-4 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-gray-700">Cart Total:</span>
              <span className="text-[#FF6B4A]">₹150</span>
            </div>

            <hr className="my-6 border-t border-[#E8E8E8]" />
          </div>

          {/* Right: Buy & Invoice */}
          <div className="lg:border-l-2 border-[#E8E8E8] lg:pl-8 mt-8 lg:mt-0 flex flex-col gap-6">
            <BuyNowlg />

            <InvoiceSummary />

            <BuyNowPhone />
          </div>
        </div>
      </div>
    </div>
  );
}
