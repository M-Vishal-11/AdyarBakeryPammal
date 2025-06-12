"use client";
import { useRouter } from "next/navigation";

const BuyNowPhone = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/address");
      }}
      className="inline-block lg:hidden bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white
      shadow-md hover:shadow-lg
      text-lg w-30 rounded-xl mb-5 p-2 ml-auto mt-3 mr-2 cursor-pointer 
      active:scale-90 transition-transform duration-200"
    >
      Buy Now
    </button>
  );
};

export default BuyNowPhone;
