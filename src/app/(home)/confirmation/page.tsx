"use client";
import { useState } from "react";
import Backbtn from "./functions/backbtn";
import PlaceOrderbtn from "./functions/placeOrderbtn";

export default function Page() {
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <div className="bg-[#FFF9F7] min-h-screen p-4 lg:p-8 text-gray-800">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#333]">
            Complete Your Order
          </h1>
          <p className="text-gray-600 mt-2">
            Review and confirm your payment details
          </p>
        </div>

        {/* Invoice */}
        <div className="bg-white rounded-xl border border-[#FFE5DC] shadow-sm p-6 transition-all hover:shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-[#FFF0EB] p-2 rounded-full mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#FF6B4A]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#333]">Order Summary</h2>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Items (4)</span>
              <span>₹150</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Delivery</span>
              {/* <span className="text-green-600 font-medium">FREE</span> */}
              <span>₹20</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600 font-medium">-₹50</span>
            </div>

            <div className="border-t border-dashed border-gray-200 my-3"></div>

            <div className="flex justify-between py-2 text-green-600">
              <span className="font-semibold">You Save</span>
              <span className="font-semibold">₹50</span>
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="flex justify-between py-2 text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-[#FF6B4A]">₹120</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#FFE5DC]">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-[#FF6B4A]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
            Payment Method
          </h3>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select payment option
            </label>
            <select
              required
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-[#FF6B4A] sm:text-sm rounded-lg"
            >
              <option value="" disabled>
                Select Payment Method
              </option>
              <option value="COD">Cash on Delivery</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 mt-8">
          <Backbtn />
          <PlaceOrderbtn payment={paymentMethod} />
        </div>
      </div>
    </div>
  );
}
