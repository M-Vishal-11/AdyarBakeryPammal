"use client";
import { useRouter } from "next/navigation";

const BuyNowlg = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/address");
      }}
      className="hidden lg:block bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white p-4 
      shadow-md hover:shadow-lg
      text-2xl w-52 rounded-xl mb-5 
      cursor-pointer active:scale-90 transition-transform duration-200"
    >
      Buy Now
    </button>
  );
};

export default BuyNowlg;
