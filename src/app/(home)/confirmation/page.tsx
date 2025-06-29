"use client";
import { useEffect, useState } from "react";
import Backbtn from "./functions/backbtn";
import InvoiceSummary from "@/components/helperFunctions/InvoiceSummary";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type Invoice = {
  CartTotal: number;
  discountedPrice?: number | undefined;
  delivery: number;
};

export default function Confirmation() {
  const [invoice, setInvoice] = useState<Invoice | null>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const userID = user?.id;

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/cart/invoiceMaker");
      setInvoice(res.data.invoice);
    };
    getData();
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    await axios.post("/api/pusher/send-order", { userID });
    router.push("/waiting");
  };

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
        <InvoiceSummary
          cartTotal={invoice?.CartTotal ?? 0}
          discount={invoice?.discountedPrice ?? 0}
          delivery={invoice?.delivery ?? 0}
          total={
            (invoice?.CartTotal ?? 0) -
            (invoice?.discountedPrice ?? 0) +
            (invoice?.delivery ?? 0)
          }
        />

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 mt-8">
          <Backbtn />
          <button
            disabled={loading}
            onClick={!loading ? handlePlaceOrder : undefined}
            className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 active:bg-amber-600                 
                 text-white border border-amber-600
                 shadow-sm hover:shadow-md
                 w-full sm:w-40 h-12 text-lg rounded-lg
                 cursor-pointer active:scale-[98%] transition-all duration-200"
            aria-label="Place order"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
