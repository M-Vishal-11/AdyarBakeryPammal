import ProductCard from "@/app/functions/productcard";
import BuyNowlg from "./functions/buynowlg";
import BuyNowPhone from "./functions/buynowphone";

export default function Page() {
  return (
    <div className="p-4 lg:p-6 bg-[#FFF9F7] min-h-screen">
      <hr className="border-t border-[#D9D9D9] my-4" />

      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Left: Product List + Cart Summary */}
        <div>
          <div className="flex flex-col gap-6">
            <ProductCard
              productName="Paneer Cake Deluxe"
              price={100}
              line1="Pan cake for free"
              line2="Extra Cheese"
              line3="Limited Edition"
            />
            <ProductCard productName="Choco Muffin" price={90} />
            <ProductCard productName="Vanilla Bliss" price={120} />
            <ProductCard productName="Red Velvet Dream" price={130} />
          </div>

          {/* Cart Total */}
          <div className="mt-6 rounded-xl bg-[#FFEAE5] text-lg font-semibold flex justify-between px-4 py-3 shadow-sm">
            <span>Cart Total:</span>
            <span>₹150</span>
          </div>

          <hr className="my-5 border-t border-[#D9D9D9]" />
        </div>

        {/* Right: Buy & Invoice */}
        <div className="lg:border-l-2 border-[#D9D9D9] lg:pl-6 mt-8 lg:mt-0 flex flex-col gap-4">
          <BuyNowlg />

          <div className="bg-white rounded-lg shadow-sm px-4 py-4">
            <h1 className="underline font-bold text-lg mb-2">Invoice:</h1>
            <ol className="space-y-1 text-sm font-medium">
              <li className="flex justify-between">
                <span>Cart Total:</span> <span>₹150</span>
              </li>
              <li className="flex justify-between">
                <span>Delivery:</span> <span>₹0</span>
              </li>
              <li className="flex justify-between">
                <span>Discount:</span> <span>₹50</span>
              </li>
              <li className="flex justify-between text-green-600">
                <span>Today&apos;s Saved:</span> <span>₹50</span>
              </li>
              <li className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Total Amount:</span> <span>₹100</span>
              </li>
            </ol>
          </div>

          <BuyNowPhone />
        </div>
      </div>
    </div>
  );
}
