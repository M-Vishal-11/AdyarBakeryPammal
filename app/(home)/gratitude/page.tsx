"use client";
import { motion, useAnimationControls } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";

// Dynamically import Confetti to reduce initial bundle size
const Confetti = dynamic(() => import("react-confetti"), {
  ssr: false,
  loading: () => null,
});

const bakeryEmojis = ["🥖", "🍪", "🎂", "🧁", "🍩", "☕"];

interface EmojiProps {
  fontSize: string;
  rotate: number;
  x: number;
  delay: number;
  duration: number;
}

export default function GratitudePage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [emojiProps, setEmojiProps] = useState<EmojiProps[]>([]);
  const controls = useAnimationControls();

  // Resize handler
  const handleResize = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    handleResize();
    setShowConfetti(true); // Always show confetti

    const confettiTimeout = setTimeout(() => setShowConfetti(false), 8000);
    controls.start("visible");
    window.addEventListener("resize", handleResize);

    // Generate props for emoji animation
    const newProps = bakeryEmojis.map(() => ({
      fontSize: `${16 + Math.random() * 16}px`,
      rotate: Math.random() * 360,
      x: Math.random() * window.innerWidth,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }));
    setEmojiProps(newProps);

    return () => {
      clearTimeout(confettiTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [controls, handleResize]);

  const containerVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const floatingItemVariants = {
    initial: (custom: number) => ({
      y: -50,
      x: emojiProps[custom]?.x ?? 0,
      opacity: 0,
      rotate: emojiProps[custom]?.rotate ?? 0,
    }),
    animate: (custom: number) => ({
      y: dimensions.height + 50,
      opacity: [0, 1, 1, 0],
      rotate: emojiProps[custom]?.rotate ?? 0,
      transition: {
        duration: emojiProps[custom]?.duration ?? 10,
        delay: emojiProps[custom]?.delay ?? 0,
        repeat: Infinity,
        ease: "linear",
      },
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFF0E5] to-[#FFE8D6] px-4 overflow-hidden">
      {showConfetti && dimensions.width > 0 && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          gravity={0.2}
          numberOfPieces={dimensions.width < 768 ? 100 : 300}
          colors={["#B02B03", "#FF9A76", "#FFD166", "#83C5BE", "#FF6B6B"]}
        />
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center max-w-md w-full relative overflow-hidden"
      >
        <motion.div
          className="absolute -top-8 -left-8 text-4xl sm:text-5xl"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          aria-hidden="true"
        >
          🥐
        </motion.div>
        <motion.div
          className="absolute -bottom-8 -right-8 text-4xl sm:text-5xl"
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{ repeat: Infinity, duration: 5, delay: 1 }}
          aria-hidden="true"
        >
          🍰
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-[#B02B03] mb-4 sm:mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            🎉 Order Confirmed!
          </motion.h1>

          <motion.p
            className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Why step out when your favorites are coming to you? Enjoy a cozy
            meal at home!
          </motion.p>

          <div className="space-y-3 sm:space-y-4">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(176, 43, 3, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#B02B03] to-[#E85D04] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all w-full text-sm sm:text-base"
              onClick={() => (window.location.href = "/products")}
            >
              Continue Shopping
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-[#B02B03] text-[#B02B03] px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold transition-all w-full text-sm sm:text-base"
              onClick={() => (window.location.href = "/account/orders")}
            >
              Track Your Order
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating bakery emojis */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {emojiProps.map((props, index) => (
          <motion.div
            key={index}
            className="absolute"
            custom={index}
            initial="initial"
            animate="animate"
            variants={floatingItemVariants}
            aria-hidden="true"
            style={{ fontSize: props.fontSize }}
          >
            {bakeryEmojis[index]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
