"use client";
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4" /* Smaller icon */
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
      <span>Back</span>
    </Link>
  );
};

export default Backbtn;
