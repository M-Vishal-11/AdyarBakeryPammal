"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";
import toast from "react-hot-toast";

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

interface PlaceOrderBtnProps {
  payment: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

const PlaceOrderbtn = ({ payment }: PlaceOrderBtnProps) => {
  const router = useRouter();

  const PlaceOrderBtnfn = async () => {
    if (payment === "") {
      toast.error("Please select a payment method");
      return;
    }

    if (payment === "Card" || payment === "UPI") {
      try {
        const response = await axios.post("/api/createPayment", {
          amount: 10000,
        });
        const data = response.data;

        const paymentData: RazorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: data.id,
          handler: async function (response: PaymentHandlerResponse) {
            try {
              const res = await axios.post("/api/verifyPayment", {
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });

              if (res.data.success) {
                toast.success("Payment Successful!");
                router.push("/gratitude");
              } else {
                toast.error("Payment Failed!");
              }
            } catch (error) {
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
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          console.error("Payment Error:", error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    } else {
      // For Cash on Delivery
      router.push("/gratitude");
    }
  };

  return (
    <>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <button
        onClick={PlaceOrderBtnfn}
        className={`flex items-center justify-center 
                 ${
                   !payment
                     ? "bg-amber-300 cursor-not-allowed"
                     : "bg-amber-500 hover:bg-amber-600 active:bg-amber-600"
                 } 
                 text-white border border-amber-600
                 shadow-sm hover:shadow-md
                 w-full sm:w-40 h-12 text-lg rounded-lg
                 cursor-pointer active:scale-[98%] transition-all duration-200`}
        disabled={!payment}
        aria-label="Place order"
      >
        Place Order
      </button>
    </>
  );
};

export default PlaceOrderbtn;
