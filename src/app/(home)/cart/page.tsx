import ProductCard from "@/src/app/functions/productcard";
import BuyNowlg from "./functions/buynowlg";
import BuyNowPhone from "./functions/buynowphone";

export default function Page() {
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
              <ProductCard
                productName="Paneer Cake Deluxe"
                price={100}
                discountedPrice={20}
                line1="Pan cake for free"
                line2="Extra Cheese"
                line3="Limited Edition"
              />
              <ProductCard productName="Choco Muffin" price={90} />
              <ProductCard productName="Vanilla Bliss" price={120} />
              <ProductCard productName="Red Velvet Dream" price={130} />
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

            <div className="bg-white rounded-xl border border-[#F0F0F0] shadow-sm px-6 py-5 hover:shadow-md transition-shadow">
              <h1 className="text-xl font-bold text-[#333] mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[#FF6B4A]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Order Summary
              </h1>
              <ol className="space-y-3 text-base font-medium">
                <li className="flex justify-between">
                  <span className="text-gray-600">Cart Total:</span>
                  <span>₹150</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="text-green-600">₹0</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="text-green-600">-₹50</span>
                </li>
                <li className="flex justify-between text-green-600 pt-2">
                  <span className="font-semibold">Today&apos;s Savings:</span>
                  <span className="font-semibold">₹50</span>
                </li>
                <li className="flex justify-between font-bold border-t pt-3 mt-3 text-lg">
                  <span>Total Amount:</span>
                  <span className="text-[#FF6B4A]">₹100</span>
                </li>
              </ol>
            </div>

            <BuyNowPhone />
          </div>
        </div>
      </div>
    </div>
  );
}
