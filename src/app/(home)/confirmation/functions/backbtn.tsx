"use client";
import BackSVG from "@/components/icons/svgs/BackSVG";
import Link from "next/link";

const Backbtn = () => {
  return (
    <Link
      href="/address"
      className="inline-flex items-center justify-center gap-2 
                 bg-white border border-[#FF6B4A] text-[#FF6B4A] 
                 hover:bg-[#FFF0EB] text-sm md:text-base rounded-lg 
                 py-2 px-4 h-[42px]  /* Fixed height */
                 shadow-sm hover:shadow-md
                 transition-all duration-200 active:scale-[98%] 
                 font-medium"
      aria-label="Go back"
    >
      <BackSVG />
      <span>Back</span>
    </Link>
  );
};

export default Backbtn;
