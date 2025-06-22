"use client";
import { useRouter } from "next/navigation";

export default function OrderNowHome() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/shop");
      }}
      style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
      className="bg-[#b02b03] text-[4.5vh] text-[#ffebe6] p-[1.5vh] rounded-xl block mx-auto mt-[30vh] 
      shadow-md hover:shadow-lg
      cursor-pointer active:scale-90 transition-transform duration-200"
    >
      Order Now
    </button>
  );
}
