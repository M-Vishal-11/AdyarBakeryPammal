"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import TickSVG from "@/components/icons/svgs/TickSVG";
import TimerSVG from "@/components/icons/svgs/TimerSVG";
import PayByCash from "@/components/icons/svgs/PayByCash";
import PayOnline from "@/components/icons/svgs/PayOnline";
import SmallTickSVG from "@/components/icons/svgs/SmallTickSVG";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Script from "next/script";

interface PaymentHandlerResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string | undefined;
  order_id: string;
  handler: (response: PaymentHandlerResponse) => Promise<void>;
  method: {
    netbanking: boolean;
    card: boolean;
    upi: boolean;
    wallet: boolean;
    emi: boolean;
    paylater: boolean;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

const OrderAcceptedPage = () => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleOnlinePayment = async () => {
    setLoading(true);
    if (!selectedPayment) {
      setLoading(false);
      toast.error("Please select a payment method");
      return;
    }

    const createToastId = toast.loading("Creating order...");

    try {
      const res = await axios.post("/api/createPayment", {
        selectedPayment,
      });

      toast.dismiss(createToastId);

      if (res?.data?.cash) {
        router.push("/gratitude");
        return;
      } else {
        const data = res.data;
        const paymentData: RazorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: data.id,
          handler: async function (response: PaymentHandlerResponse) {
            const verifyToastId = toast.loading("Verifying payment...");
            try {
              const res = await axios.post("/api/verifyPayment", {
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });

              toast.dismiss(verifyToastId);

              if (res.data.success) {
                toast.success("Payment Successful!");
                router.push("/gratitude");
              } else {
                toast.error("Payment Failed!");
              }
            } catch (error) {
              toast.dismiss(verifyToastId);
              if (error instanceof Error) {
                toast.error(error.message);
              } else {
                toast.error("An unknown error occurred during verification");
              }
            }
          },
          method: {
            netbanking: true,
            card: true,
            upi: true,
            wallet: true,
            emi: false,
            paylater: false,
          },
        };

        const rzp = new window.Razorpay(paymentData);
        rzp.open();
      }
    } catch (error) {
      toast.dismiss(createToastId);
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Payment Error:", error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Head>
        <title>Order Accepted | Payment</title>
        <meta
          name="description"
          content="Complete your purchase with secure payment options"
        />
      </Head>

      <div className="min-h-screen bg-[#ffebe6] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-400 p-6 text-center">
            <TickSVG />
            <h1 className="text-2xl font-bold text-white mt-4">
              Order Accepted!
            </h1>
            <p className="text-white opacity-90 mt-2">
              Thank you for your purchase
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6 text-center">
              <TimerSVG />
              <p className="text-gray-600">
                Your order is being prepared and will be ready soon
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Select Payment Method
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => setSelectedPayment("cash")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedPayment === "cash"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center">
                    <PayByCash />
                    <span className="ml-3 font-medium">Pay by Cash</span>
                  </div>
                  {selectedPayment === "cash" && <SmallTickSVG />}
                </button>

                <button
                  onClick={() => setSelectedPayment("online")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedPayment === "online"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center">
                    <PayOnline />
                    <span className="ml-3 font-medium">Pay Online</span>
                  </div>
                  {selectedPayment === "online" && <SmallTickSVG />}
                </button>
              </div>
            </div>

            <button
              onClick={handleOnlinePayment}
              disabled={!selectedPayment || loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                selectedPayment
                  ? "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 shadow-md hover:shadow-lg"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {selectedPayment
                ? `Complete ${
                    selectedPayment === "cash" ? "Cash" : "Online"
                  } Payment`
                : "Select a payment method"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderAcceptedPage;
