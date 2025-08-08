"use client";
import ProductCard from "@/app/functions/productcard";
import BuyNowlg from "./functions/buynowlg";
import BuyNowPhone from "./functions/buynowphone";
import InvoiceSummary from "@/components/helperFunctions/InvoiceSummary";
import { useEffect, useState } from "react";
import axios from "axios";
import UserShopStatus from "@/app/functions/UserShopStatus";

// Top of the file
type Product = {
  productName: string;
  price: number;
  discountedPrice?: number;
  descriptions: Array<string>;
  available: boolean;
  imageUrl: string;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartData, setCartData] = useState<Record<string, number>>({});
  const [cartTotal, setCartTotal] = useState<number | null>(0);
  const [discount, setDiscount] = useState<number | null>(0);
  const [delivery, setDelivery] = useState<number | null>(1);
  const [changed, setChanged] = useState<{
    productName: string;
    value: number;
  } | null>(null);
  const [isShopOpen, setIsShopOpen] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/cart/getCookies");
        const cart = res.data.cartCookies;
        setCartData(cart);
        if (cart.length == 0) {
          return;
        }

        const productNames = Object.keys(cart);

        const res2 = await axios.post(
          "/api/productsDisplay/extractProductsCart",
          { productNames }
        );
        const productList: Product[] = res2.data.productData;
        setProducts(productList);

        const res3 = await axios.get("/api/admin/getDelivery");
        setDelivery(res3.data.data[0]?.delivery ?? 0);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (cartData && products) {
      const getData = () => {
        let newTotal = 0;
        let newDiscount = 0;

        products.forEach((product: Product) => {
          const quantity = cartData[product.productName] ?? 0;
          const itemTotal = product.price * quantity;
          newTotal += itemTotal;

          if (product.discountedPrice) {
            const discountedTotal = product.discountedPrice * quantity;
            newDiscount += itemTotal - discountedTotal;
          }
        });

        setCartTotal(newTotal);
        setDiscount(newDiscount);
      };
      getData();
    }
  }, [cartData, products]);

  useEffect(() => {
    if (changed) {
      setCartData((prev) => ({
        ...prev,
        [changed.productName]: changed.value,
      }));
    }
  }, [changed]);

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

  if (!isShopOpen) {
    return (
      <>
        <UserShopStatus />
      </>
    );
  }

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
                  setChanged={setChanged}
                />
              ))}
            </div>

            {/* Cart Total */}
            <div className="mt-8 rounded-xl bg-white border border-[#FFD5C8] text-lg font-semibold flex justify-between px-6 py-4 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-gray-700">Cart Total:</span>
              <span className="text-[#FF6B4A]">₹{cartTotal ?? 0}</span>
            </div>

            <hr className="my-6 border-t border-[#E8E8E8]" />
          </div>

          {/* Right: Buy & Invoice */}
          <div className="lg:border-l-2 border-[#E8E8E8] lg:pl-8 mt-8 lg:mt-0 flex flex-col gap-6">
            <BuyNowlg cartData={cartData} />

            <InvoiceSummary
              cartTotal={cartTotal ?? 0}
              delivery={delivery ?? 1}
              discount={discount ?? 0}
              total={(cartTotal ?? 0) - (discount ?? 0) + (delivery ?? 0)}
            />

            <BuyNowPhone cartData={cartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
