"use client";
import { useRouter } from "next/navigation";

const Backbtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/address");
      }}
      className="bg-gray-500 opacity-35 hover:opacity-100 hover:bg-gray-700 active:opacity-100 active:bg-gray-700 text-white text-lg rounded-xl mb-5 px-4 py-2 mt-3 
      shadow-md hover:shadow-lg
      cursor-pointer active:scale-90 transition-transform duration-200"
    >
      <span className="transform rotate-180 inline-block">➤</span> Back
    </button>
  );
};

export default Backbtn;
