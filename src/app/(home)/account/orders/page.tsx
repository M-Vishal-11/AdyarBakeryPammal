"use client";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

// ✅ Types for order and items
type OrderItem = {
  productName: string;
  qnty: number;
  price?: number;
  discountedPrice?: number;
};

type Order = {
  date: string;
  orders: OrderItem[];
  totalAmount: number;
  status: string;
};

export default function OrderDetails() {
  const { user } = useUser();
  const userId = user?.id;

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!userId) return;

    const getData = async () => {
      const res = await axios.post("/api/orderStuff/getOrders", { userId });
      const orderData = res.data.order;

      if (orderData?.orders && typeof orderData.orders === "string") {
        orderData.orders = JSON.parse(orderData.orders);
        const d = new Date(orderData.date);

        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        orderData.date = `${days[d.getDay()]}, ${d.getDate()} ${
          months[d.getMonth()]
        } ${d.getFullYear()}`;
      }

      setOrder(orderData);
    };

    getData();
  }, [userId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back button and page title */}
        <div className="mb-6 flex items-center">
          <Link
            href="/account"
            className="flex items-center text-[#FF6B4A] hover:text-[#e55a3a] mr-4"
            prefetch={false}
          >
            <FiArrowLeft className="mr-1" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        </div>

        {/* Order card */}
        <article className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#FFD1C2]">
          <div className="p-5 sm:p-6">
            {/* Order header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 mt-1">{order.date}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {order.status}
              </span>
            </div>

            {/* Order items */}
            <div className="space-y-3 mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">ITEMS</h3>
              {order.orders.map((item: OrderItem, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B4A] mr-3"></span>
                    <p className="text-gray-700">
                      {item.productName} × {item.qnty}
                    </p>
                  </div>
                  <p className="text-gray-800 font-medium">
                    ₹{(item.discountedPrice || item.price || 0) * item.qnty}
                  </p>
                </div>
              ))}
            </div>

            {/* Order footer */}
            <div className="flex justify-between items-center pt-4 border-t border-[#FFE5DC]">
              <p className="text-gray-600 font-medium">Total Amount</p>
              <p className="text-lg font-bold text-[#FF6B4A]">
                ₹{order.totalAmount}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
