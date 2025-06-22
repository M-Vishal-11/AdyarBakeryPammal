"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PlaceOrderbtn = ({ payment }: any) => {
  const router = useRouter();

  const PlaceOrderBtnfn = () => {
    if (payment === "") {
      toast.error("Please select a payment method");
    } else {
      router.push("/gratitude");
    }
  };

  return (
    <button
      onClick={PlaceOrderBtnfn}
      className="bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white 
      shadow-md hover:shadow-lg
      w-40 h-14 text-2xl rounded-xl mb-5 p-2 mt-4 
      cursor-pointer active:scale-90 transition-transform duration-200"
    >
      Place Order
    </button>
  );
};

export default PlaceOrderbtn;
