"use client";
import { useEffect, useState } from "react";
import Backbtn from "./functions/backbtn";
import PlaceOrderbtn from "./functions/placeOrderbtn";
import InvoiceSummary from "@/components/helperFunctions/InvoiceSummary";
import PaymentMethodSVG from "@/components/icons/svgs/PaymentMethodSVG";
import axios from "axios";

export default function Page() {
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/cart/invoiceMaker");
      console.log(res);
    };
    getData();
  }, []);

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
        <InvoiceSummary />

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#FFE5DC]">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <PaymentMethodSVG />
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
