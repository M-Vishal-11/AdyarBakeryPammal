"use client";

import axios from "axios";
import { FiCheck, FiX } from "react-icons/fi";

export default function Availabilitybtn({
  isAvailable,
  setIsAvailable,
  toggleAvailability,
}: {
  setIsAvailable: (isAvailable: boolean) => void;
  isAvailable: boolean;
  toggleAvailability: () => void;
}) {
  return (
    <button
      onClick={() => {
        toggleAvailability();
      }}
      className={`w-full py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
        isAvailable
          ? "bg-green-100 hover:bg-green-200 text-green-800"
          : "bg-red-100 hover:bg-red-200 text-red-800"
      }`}
    >
      {isAvailable ? (
        <>
          <FiCheck /> Available
        </>
      ) : (
        <>
          <FiX /> Unavailable
        </>
      )}
    </button>
  );
}
