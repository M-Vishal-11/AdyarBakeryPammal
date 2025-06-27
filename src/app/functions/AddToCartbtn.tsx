"use client";
import { useState } from "react";

export default function AddToCartbtn() {
  const [qnty, setqnty] = useState(0);

  return (
    <>
      {qnty === 0 ? (
        <button
          onClick={() => setqnty(qnty + 1)}
          className="absolute bottom-1 right-2 px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white 
          w-28 h-10 text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:brightness-110 
          active:scale-95 transition-all duration-200
          xs:w-24 xs:h-9 xs:text-xs
          sm:w-28 sm:text-sm
          md:w-32 md:h-11 md:text-base"
        >
          Add To Cart
        </button>
      ) : (
        <button
          className="absolute bottom-1 right-2 flex items-center justify-between 
          bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-full shadow-md w-28 h-10
          font-semibold tracking-wide cursor-pointer active:scale-95 transition-transform duration-200
          xs:w-24 xs:h-9
          sm:w-28
          md:w-32 md:h-11"
        >
          <span
            onClick={(e) => {
              setqnty((prev) => Math.max(prev - 1, 0));
            }}
            className="text-xl w-1/3 grow text-left flex items-center justify-start
            xs:text-lg
            sm:text-xl
            md:text-2xl"
          >
            −
          </span>
          <span
            className="text-lg shrink grow-0
            xs:text-base
            sm:text-lg
            md:text-xl"
          >
            {qnty}
          </span>
          <span
            onClick={(e) => {
              setqnty(qnty + 1);
            }}
            className="text-xl w-1/3 grow text-right flex items-center justify-end
            xs:text-lg
            sm:text-xl
            md:text-2xl"
          >
            ＋
          </span>
        </button>
      )}
    </>
  );
}
