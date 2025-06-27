import ProductCard from "@/app/functions/productcard";
import BuyNowlg from "./functions/buynowlg";
import BuyNowPhone from "./functions/buynowphone";
import InvoiceSummary from "@/components/helperFunctions/InvoiceSummary";

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

            <InvoiceSummary />

            <BuyNowPhone />
          </div>
        </div>
      </div>
    </div>
  );
}
