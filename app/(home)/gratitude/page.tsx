"use client";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function GratitudePage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update window size
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const timeout = setTimeout(() => setShowConfetti(false), 5000); // Stop after 5s
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF8F5] px-4">
      {showConfetti && (
        <Confetti width={dimensions.width} height={dimensions.height} />
      )}

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full"
      >
        <motion.h1
          className="text-4xl font-bold text-[#B02B03] mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🎉 Thank You!
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Your order has been placed successfully. We’re preparing your
          delicious items with love. ❤️
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#B02B03] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition"
          onClick={() => (window.location.href = "/products")}
        >
          Continue Shopping
        </motion.button>
      </motion.div>
    </div>
  );
}
