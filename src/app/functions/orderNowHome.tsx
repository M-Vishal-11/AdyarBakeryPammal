"use client";
import { useRouter } from "next/navigation";

export default function OrderNowHome() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/shop")}
      className="bg-[#b02b03] text-white text-xl font-semibold py-4 px-12 rounded-full
      shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95
      transition-all duration-200 ease-out"
    >
      Order Now →
    </button>
  );
}
