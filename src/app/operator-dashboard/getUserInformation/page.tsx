"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface UserData {
  name: string;
  phoneNumber: string;
  street: string;
  area: string;
  flat: string;
  googleMap: string;
  deliveryNote: string;
}

interface OrderData {
  payment: string; // Updated to accept both number and string
  isPaid: boolean;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  userId: string;
}

const GetOrderInformation = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/orderStuff/getUser", {
          orderId,
        });
        setUserData(data.userData);
        setOrderData(data.orderData);
      } catch (err) {
        console.error("Failed to fetch order data:", err);
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#ffebe6]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6b6b]"></div>
      </div>
    );
  }

  if (!orderData || !userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#ffebe6]">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            No Data Found
          </h2>
          <p className="text-gray-600">
            Could not find order information for the provided ID
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffebe6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-[#ff6b6b] p-6 text-white">
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="opacity-90">Order ID: {orderId}</p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Customer Information
              </h2>

              <InfoField label="Name" value={userData.name} />
              <InfoField label="Phone Number" value={userData.phoneNumber} />
              <InfoField label="Street" value={userData.street} />
              <InfoField label="Area" value={userData.area} />
              <InfoField label="Flat/House No" value={userData.flat} />
              <InfoField
                label="Google Map Link"
                value={userData.googleMap}
                isLink={true}
              />
              <InfoField
                label="Delivery Note"
                value={userData.deliveryNote || "None"}
              />
            </div>

            {/* Order Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Order & Payment
              </h2>

              <InfoField label="Payment Amount" value={orderData.payment} />
              <InfoField
                label="Payment Status"
                value={orderData.isPaid ? "Paid" : "Not Paid"}
                highlight={orderData.isPaid ? "green" : "red"}
              />
              <InfoField
                label="Razorpay Order ID"
                value={orderData.razorpayOrderId || "N/A"}
              />
              <InfoField
                label="Razorpay Payment ID"
                value={orderData.razorpayPaymentId || "N/A"}
              />
              <InfoField
                label="Razorpay Signature"
                value={orderData.razorpaySignature || "N/A"}
              />
              <InfoField label="User ID" value={orderData.userId} />
              <InfoField label="Order ID" value={orderId as string} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable component for info fields
const InfoField = ({
  label,
  value,
  isLink = false,
  highlight,
}: {
  label: string;
  value: string;
  isLink?: boolean;
  highlight?: "green" | "red";
}) => {
  let highlightClass = "";
  if (highlight === "green") highlightClass = "text-green-600 font-medium";
  if (highlight === "red") highlightClass = "text-red-600 font-medium";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-500">{label}</label>
      {isLink && value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-1 block w-full px-3 py-2 bg-gray-50 rounded-md ${highlightClass} text-blue-600 hover:underline truncate`}
        >
          {value}
        </a>
      ) : (
        <div
          className={`mt-1 w-full px-3 py-2 bg-gray-50 rounded-md select-all ${highlightClass}`}
        >
          {value || "N/A"}
        </div>
      )}
    </div>
  );
};

export default GetOrderInformation;
