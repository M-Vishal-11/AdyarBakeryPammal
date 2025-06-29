"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const DeliveryAmountInput = () => {
  const [deliveryFee, setDeliveryFee] = useState<number | null>(0);

  const changeDeliveryAmt = async () => {
    await axios.post("/api/admin/updateDelivery", { deliveryFee });
  };

  useEffect(() => {
    const getDeliveryDetails = async () => {
      const res = await axios.get("/api/admin/getDelivery");
      setDeliveryFee(res.data.data[0].delivery);
    };
    getDeliveryDetails();
  }, []);

  return (
    <div>
      <div className="bg-[#ffebe6] min-h-[calc(100vh-4rem)] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Delivery Details
            </h1>
            <p className="text-gray-600 mt-1">Manage your delivery settings</p>
          </div>

          {/* Delivery Amount Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="deliveryAmount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Delivery Amount
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg">₹</span>
                  </div>
                  <input
                    value={deliveryFee as number}
                    onChange={(e) => setDeliveryFee(Number(e.target.value))}
                    type="number"
                    id="deliveryAmount"
                    name="deliveryAmount"
                    required
                    min="0"
                    step="1"
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff8c66] focus:border-transparent transition-all duration-200 text-base"
                    placeholder="0"
                    aria-describedby="amount-currency"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 text-sm"
                      id="amount-currency"
                    >
                      INR
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Enter the delivery fee amount in Indian Rupees
                </p>
              </div>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={changeDeliveryAmt}
                  type="submit"
                  className="px-5 py-2.5 bg-[#ff8c66] text-white rounded-lg hover:bg-[#ff774d] focus:outline-none focus:ring-2 focus:ring-[#ff8c66] focus:ring-offset-2 transition-colors duration-200"
                >
                  Save Delivery Fee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAmountInput;
