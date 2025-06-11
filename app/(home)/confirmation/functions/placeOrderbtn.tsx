"use client";
import { useRouter } from "next/navigation";

const PlaceOrderbtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/gratitude");
      }}
      className="bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white w-40 h-14 text-2xl rounded-xl mb-5 p-2 mt-4 cursor-pointer active:scale-90 transition-transform duration-200"
    >
      Place Order
    </button>
  );
};

export default PlaceOrderbtn;
