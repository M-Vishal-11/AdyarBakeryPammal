import Backbtn from "./functions/backbtn";
import PlaceOrderbtn from "./functions/placeOrderbtn";

export default function Page() {
  return (
    <div className="bg-[#FFF9F7] min-h-screen p-4 lg:p-6 text-gray-800">
      {/* Invoice */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <h1 className="underline font-bold text-xl mb-3">Invoice:</h1>
        <ul className="space-y-2 font-medium text-sm sm:text-base">
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
        </ul>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <label className="font-semibold text-sm sm:text-base">
          Method of Payment:
        </label>
        <select className="block mt-2 w-full max-w-xs bg-white border border-gray-300 text-black rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-red-300 focus:outline-none">
          <option>Cash</option>
          {/* Add more methods later */}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <PlaceOrderbtn />
        <Backbtn />
      </div>
    </div>
  );
}
