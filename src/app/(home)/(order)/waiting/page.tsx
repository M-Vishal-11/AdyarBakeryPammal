"use client";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Pusher from "pusher-js";

const WaitingPage = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isCancelled, setIsCancelled] = useState(false);
  const progress = useMotionValue(0);
  const controls = useAnimation();
  const router = useRouter();
  const { user } = useUser(); // ✅ correct
  const userId = user?.id;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!userId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("customer");
    const eventName = userId;

    const handler = (data: any) => {
      router.push("/orderAccepted");
    };

    channel.bind(eventName, handler);

    return () => {
      channel.unbind(eventName, handler);
      pusher.unsubscribe("customer");
    };
  }, [userId]);

  // Animate progress bar with easing
  useEffect(() => {
    controls.start({
      scaleX: 1,
      transition: {
        duration: 300,
        ease: [0.6, 0.05, 0.3, 0.9],
      },
    });
  }, [controls]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0 || isCancelled) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isCancelled]);

  // Update progress value
  useEffect(() => {
    if (!isCancelled) {
      progress.set(1 - timeLeft / 300);
    }
  }, [timeLeft, progress, isCancelled]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleCancel = async () => {
    setIsCancelled(true);
    await axios.post("/api/orderStuff/cancelOrder", { userId });
    router.push("/orderCancelled");
  };

  return (
    <>
      <Head>
        <title>Order Review in Progress</title>
        <meta
          name="description"
          content="Your order is being reviewed by the owner"
        />
      </Head>

      <div className="min-h-screen bg-[#ffebe6] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden p-8 text-center">
          {/* Animated icon */}
          <motion.div
            animate={
              isCancelled
                ? {}
                : {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mx-auto w-20 h-20 mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-full w-full ${
                isCancelled ? "text-gray-400" : "text-amber-500"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            {isCancelled
              ? "Order Cancellation in Progress"
              : "Order Under Review"}
          </h1>
          <p className="text-gray-600 mb-6">
            {isCancelled
              ? "Your order cancellation is being processed."
              : "Please wait while the manager reviews your order."}
            <br />
            {!isCancelled && "Typically takes less than 5 minutes."}
          </p>

          {/* Progress bar */}
          {!isCancelled && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Estimated time remaining</span>
                <span>{formatTime(timeLeft)}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={controls}
                  style={{ scaleX: progress }}
                />
              </div>
            </div>
          )}

          {/* Status message */}
          {isCancelled ? (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mx-auto text-gray-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>You will be redirected shortly...</p>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel Order
            </motion.button>
          )}

          {/* Support link */}
          <div className="mt-8 pt-5 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">
              Need immediate assistance?
            </p>
            <Link
              href="/account/contactus"
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingPage;
