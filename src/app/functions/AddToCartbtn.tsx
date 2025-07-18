"use client";
import axios from "axios";
import { useState } from "react";

export default function AddToCartBtn({
  disabled,
  isAvailable,
  productName,
  userQnty,
  setChanged,
}: {
  disabled: boolean;
  isAvailable: boolean;
  productName: string;
  userQnty?: number;
  setChanged?: (change: { productName: string; value: number }) => void;
}) {
  const [qnty, setQnty] = useState(userQnty ? userQnty : 0);

  const updateQnty = async (newQnty: number) => {
    if (setChanged) setChanged({ productName, value: newQnty });

    await axios.post("/api/cart/postCookies", {
      productName,
      qnty: newQnty,
    });
  };

  const baseClasses = `absolute bottom-1 right-2 px-3 py-2 text-white w-28 h-10 text-sm font-semibold rounded-full shadow-md 
    active:scale-95 transition-all duration-200 cursor-default
    xs:w-24 xs:h-9 xs:text-xs
    sm:w-28 sm:text-sm
    md:w-32 md:h-11 md:text-base`;

  if (!isAvailable) {
    return (
      <button
        disabled={true}
        className={`${baseClasses} bg-gray-400 opacity-90`}
        aria-label="Product unavailable"
      >
        Unavailable
      </button>
    );
  }

  return (
    <>
      {qnty === 0 ? (
        <button
          disabled={disabled}
          onClick={() => {
            const newQnty = qnty + 1;
            setQnty(newQnty);
            updateQnty(newQnty);
          }}
          className={`${baseClasses} bg-gradient-to-r from-gray-500 to-gray-600 
          hover:shadow-lg hover:brightness-110 cursor-pointer`}
          aria-label="Add to cart"
        >
          Add To Cart
        </button>
      ) : (
        <button
          className={`${baseClasses} flex items-center justify-between 
          bg-gradient-to-r from-green-500 to-green-600 w-28 h-10 cursor-pointer
          xs:w-24 xs:h-9
          sm:w-28
          md:w-32 md:h-11`}
        >
          <span
            onClick={(e) => {
              e.stopPropagation();
              const newQnty = Math.max(qnty - 1, 0);
              setQnty(newQnty);
              updateQnty(newQnty);
            }}
            className="text-xl w-1/3 grow text-left flex items-center justify-start hover:brightness-110
            xs:text-lg
            sm:text-xl
            md:text-2xl"
            aria-label="Decrease quantity"
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
              e.stopPropagation();
              const newQnty = qnty + 1;
              setQnty(newQnty);
              updateQnty(newQnty);
            }}
            className="text-xl w-1/3 grow text-right flex items-center justify-end hover:brightness-110
            xs:text-lg
            sm:text-xl
            md:text-2xl"
            aria-label="Increase quantity"
          >
            ＋
          </span>
        </button>
      )}
    </>
  );
}
