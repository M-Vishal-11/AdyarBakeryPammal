"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Script from "next/script";
import toast from "react-hot-toast";

const PlaceOrderbtn = ({ payment }: any) => {
  const router = useRouter();

  const PlaceOrderBtnfn = async () => {
    if (payment === "") {
      toast.error("Please select a payment method");
    } else if (payment === "Card" || payment === "UPI") {
      try {
        const response = await axios.post("/api/createPayment", {
          amount: 10000,
        });
        const data = response.data;

        const paymentData = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: data.id,

          handler: async function (response: any) {
            //verify payment
            const res = await axios.post("/api/verifyPayment", {
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (res.data.success) {
              //payment successfull

              toast.success("Payment Successfull!");
            } else {
              toast.error("Payment Failed!");
            }
          },
          method: {
            netbanking: true,
            card: true, // ✅ Allow Debit/Credit Card
            upi: true, // ✅ Allow UPI
            wallet: true,
            emi: false,
            paylater: false,
          },
        };

        const payment = new (window as any).Razorpay(paymentData);
        payment.open();
      } catch (error: any) {
        console.log("Error: ", error.message);
      }
    } else {
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
        className="bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white 
      shadow-md hover:shadow-lg
      w-40 h-14 text-2xl rounded-xl mb-5 p-2 mt-4 
      cursor-pointer active:scale-90 transition-transform duration-200"
      >
        Place Order
      </button>
    </>
  );
};

export default PlaceOrderbtn;
