"use client";
import { useState } from "react";

export default function AddToCartbtn() {
  const [qnty, setQnty] = useState(0);

  return (
    <>
      {qnty == 0 ? (
        <button
          onClick={() => setQnty(qnty + 1)}
          className="absolute bottom-1 right-2 px-1 py-1 bg-gradient-to-r from-red-500 to-[#ff1a1a] text-white w-28 h-8
           text-sm sm:text-base font-semibold rounded-full shadow-md hover:shadow-lg hover:brightness-110 
           active:scale-95 transition-all duration-200"
        >
          Add To Cart
        </button>
      ) : (
        <button
          className="absolute bottom-1 right-2 flex items-center justify-between 
           bg-[#ff1a1a] text-white px-2 py-1 rounded-full shadow-md w-28 h-8
  font-semibold tracking-wide cursor-pointer active:scale-95 transition-transform duration-200"
        >
          <span
            onClick={() => setQnty((prev) => Math.max(prev - 1, 0))}
            className="text-xl w-1/3 grow text-left"
          >
            −
          </span>
          <span className="text-lg shrink grow-0">{qnty}</span>
          <span
            onClick={() => setQnty(qnty + 1)}
            className="text-xl w-1/3 grow text-right"
          >
            ＋
          </span>
        </button>
      )}
    </>
  );
}
