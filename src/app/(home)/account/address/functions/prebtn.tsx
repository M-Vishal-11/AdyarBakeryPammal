"use client";
import Link from "next/link";

const Prebtn = () => {
  return (
    <Link
      href="/account"
      className="bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white text-lg rounded-xl px-4 py-2 
      shadow-md hover:shadow-lg 
      cursor-pointer active:scale-90 transition-transform duration-200"
    >
      <span className="transform rotate-180 inline-block">➤</span> Back
    </Link>
  );
};

export default Prebtn;
