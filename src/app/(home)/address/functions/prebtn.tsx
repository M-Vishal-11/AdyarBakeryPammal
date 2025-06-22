"use client";
import { useRouter } from "next/navigation";

const Prebtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/cart");
      }}
      className="bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white text-lg rounded-xl mb-5 px-4 py-2 mt-3 md:mr-2
      shadow-md hover:shadow-lg 
      cursor-pointer active:scale-90 transition-transform duration-200"
    >
      <span className="transform rotate-180 inline-block">➤</span> Back
    </button>
  );
};

export default Prebtn;
